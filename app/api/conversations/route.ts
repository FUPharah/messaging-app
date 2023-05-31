import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(
  request: Request,
){
  try {
    const currentUser = await getCurrentUser()
    const body = await request.json()
    const {
      userId,
      isGroup,
      members,
      name,
    } = body;
    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if ( isGroup && ( !members || !name || members.length < 2 )) { 
      return new NextResponse('Bad Request', { status: 400 })
    }

    if (isGroup) {
      const newConversation = await prisma.conversation.create({
        data: {
          isGroup,
          name,
          users: {
            connect: [
              ...members.map((member: {value: string }) => ({ id: member.value })),
              {
                id: currentUser.id
              }
            ]
          }
        }, include: {
          users: true
        }
      });
      return NextResponse.json(newConversation);
    }

    const existingConversations = await prisma.conversation.findMany({
      where: {
        OR: [
          {
            userIds: {
              equals: [currentUser.id, userId]
            }
          },
          {
            userIds: {
              equals: [userId, currentUser.id]
            }
          }
        ]
      },
    });

    const singleConversation = existingConversations[0];

    if (singleConversation) {
      return NextResponse.json(singleConversation);
    }

    const newConversation = await prisma.conversation.create({
      data: {
        users: {
          connect: [
            {
              id: currentUser.id
            },
            {
              id: userId
            }
          ]
        }
      },
      include: {
        users: true
      }
    })

    return NextResponse.json(newConversation);

  } catch (error:any) {
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
