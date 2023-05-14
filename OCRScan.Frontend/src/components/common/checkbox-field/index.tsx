import React, { useEffect } from 'react'
import { Controller, useController, useFormContext } from 'react-hook-form'
import { Checkbox, FormControlLabel } from '@mui/material'
import Cookies from 'js-cookie'

type Props = {
  name: string
  label: string
}

export const CheckboxField = ({ name, label }: Props) => {
  const {
    control,
    formState: { isSubmitting },
  } = useFormContext()

  const { field } = useController({ name, control })

  useEffect(() => {
    Cookies.set(name, field.value)
  }, [isSubmitting])

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked={false}
              checked={value}
              onChange={(e) => onChange(e.target.checked)}
            />
          }
          label={label}
        />
      )}
    />
  )
}
