import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { PortalInputs, PortalSchema } from '../../schema/portal.schema'
import { api } from '../../utils/api'
import { PortalForm } from './PortalForm'
import { Button } from '../shared/Button'

export const CreatePortalForm: React.FC = () => {
  const formObj = useForm<PortalInputs>({
    resolver: zodResolver(PortalSchema),
  })

  const createPortal = api.portal.createPortal.useMutation()

  return (
    <div className='rounded-xl border border-lime-600 p-4'>
      <div className='flex items-start'>
        <h3 className='block text-xl font-semibold text-lime-600'>Portal Form</h3>
      </div>
      <form onSubmit={formObj.handleSubmit((data) => createPortal.mutate(data))}>
        <PortalForm formObj={formObj} />
        <div className='col-span-full'>
          <Button type='submit' color='lime' className='mt-8 w-full py-4'>
            Create portal
          </Button>
        </div>
      </form>
    </div>
  )
}
