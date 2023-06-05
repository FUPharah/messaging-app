'use client'
import { User } from "@prisma/client"
import { FieldValues, useForm, SubmitHandler } from "react-hook-form"
import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { toast } from "react-hot-toast"
import Modal from "@/app/components/Modal"
import Input from "@/app/components/inputs/Input"
import Select from "@/app/components/inputs/Select"
import Button from "@/app/components/Button"



interface GroupChatModalProps {
  isOpen?: boolean;
  onClose: () => void;
  users: User[];
}

const GroupChatModal: React.FC<GroupChatModalProps> = ({
  isOpen,
  onClose,
  users
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {register, handleSubmit, setValue, watch, formState:{ errors}
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      members: []
    }
  });
  const members = watch('members');
  const onSubmit: SubmitHandler<FieldValues> = (data) => { setIsLoading(true);
    axios.post('/api/conversations', {...data, isGroup:true})
    .then (() => {
      router.refresh();
      onClose();
    })
    .catch(() =>  toast.error('Something went wrong'))
    .finally(() => setIsLoading(false));
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Create a group chat
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-500">
              Group chats are great for planning events, or staying in touch with
              your friends or family.
            </p>
            <div className="mt-10 flex flex-col gap-y-8">
              <Input register={register} label="Name" id="name" disabled={isLoading}
                required errors={errors}/>
                <Select disabled={isLoading} label="Members" options={users.map((user) => ({
                  label: user.name,
                  value: user.id
                }))}
                onChange={(value) => setValue('members', value, {shouldValidate: true})}
                value={members} />
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Button type="button" secondary onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            Create
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default GroupChatModal;
