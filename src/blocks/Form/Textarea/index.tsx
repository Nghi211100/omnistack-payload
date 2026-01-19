import type { TextField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { Label } from '@/components/ui/label'
import { Textarea as TextAreaComponent } from '@/components/ui/textarea'
import React from 'react'

import { Error } from '../Error'
import { Width } from '../Width'

export const Textarea: React.FC<
  TextField & {
    errors: Partial<FieldErrorsImpl>
    register: UseFormRegister<FieldValues>
    rows?: number
    placeHolder?: string
  }
> = ({ name, defaultValue, errors, label, register, required, rows = 3, width, placeHolder }) => {
  return (
    <Width width={width}>
      <Label htmlFor={name}>
        {label}

        {required && (
          <span className="required">
            * <span className="sr-only">(required)</span>
          </span>
        )}
      </Label>

      <TextAreaComponent
        defaultValue={defaultValue}
        id={name}
        rows={rows}
        {...register(name, { required: required })}
        placeholder={placeHolder}
        className="rounded-xl bg-gray-400/10 border-gray-300 dark:border-[#1e4976] py-3 px-4 placeholder-gray-500 shadow-sm focus:ring-0 outline-none dark:bg-[#005eff]/20 text-gray-500 dark:text-white]"
      />

      {errors[name] && <Error name={name} />}
    </Width>
  )
}
