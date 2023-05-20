import { ErrorMessage } from '@hookform/error-message'
import type { UseFormReturn } from 'react-hook-form'
import { OrganizationInputs } from '../../schema/organization.schema'
import { inputStyle } from '../../styles/formStyles'

export const OrganizationForm: React.FC<{
  formObj: UseFormReturn<OrganizationInputs>
}> = ({ formObj }) => {
  const {
    register,
    formState: { errors },
  } = formObj
  return (
    <div className='grid grid-cols-1 items-start gap-2 sm:grid-cols-2'>
      <div>
        <label
          htmlFor='name'
          className='block w-fit text-sm font-medium text-gray-700'
        >
          Name
        </label>
        <div className='mt-1 w-full'>
          <input type='text' className={inputStyle} {...register('name')} />
          <ErrorMessage
            errors={errors}
            name='name'
            render={({ message }) => (
              <p className='text-justify text-xs text-red-600'>{message}</p>
            )}
          />
        </div>
      </div>
      <div>
        <label
          htmlFor='title'
          className='block w-fit text-sm font-medium text-gray-700'
        >
          Title
        </label>
        <div className='mt-1 w-full'>
          <input type='text' className={inputStyle} {...register('title')} />
          <ErrorMessage
            errors={errors}
            name='title'
            render={({ message }) => (
              <p className='text-justify text-xs text-red-600'>{message}</p>
            )}
          />
        </div>
      </div>{' '}
      <div className='sm:col-span-2'>
        <label
          htmlFor='message'
          className='block text-sm font-medium text-gray-700'
        >
          Description
        </label>
        <div className='mt-1'>
          <textarea
            id='description'
            rows={4}
            className={inputStyle}
            defaultValue={''}
            {...register('description')}
          />
        </div>
      </div>
    </div>
  )
}
