import React, {
  FC,
  ReactElement,
  SyntheticEvent,
  useEffect,
  useState,
} from 'react'
import Cookies from 'js-cookie'
import { Controller, useController, useFormContext } from 'react-hook-form'
import { Autocomplete, FormHelperText, TextField } from '@mui/material'
import { languageApi } from '@/store/api/language.api'
import { ILanguage } from '@/api/types'

interface IOption {
  code: string
  title: string
}

// const options: IOption[] = [
//   {
//     code: 'rus',
//     title: 'Русский',
//   },
//   {
//     code: 'eng',
//     title: 'Английский',
//   },
// ]

export const SelectLanguages: FC = (): ReactElement => {
  const {
    control,
    formState: { isSubmitting, errors },
  } = useFormContext()

  const { field } = useController({ name: 'languages', control })

  const { data, isLoading } = languageApi.useGetAllQuery()

  const [options, setOptions] = useState<ILanguage[]>([])

  useEffect(() => {
    if (data) {
      setOptions(data)
    }
  }, [data])

  useEffect(() => {
    if (field.value) {
      const langCodes = field.value.map((option: ILanguage) => option.code)
      Cookies.set('languages', JSON.stringify(langCodes))
    }
  }, [isSubmitting])

  const onAutocompleteChange = (event: SyntheticEvent, value: IOption[]) => {
    field.onChange(value)
  }

  return (
    <>
      <Controller
        name="languages"
        control={control}
        render={({ field: { value } }) => (
          <Autocomplete
            value={value}
            multiple
            options={options}
            getOptionLabel={(option) => option.name}
            onChange={onAutocompleteChange}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Языки"
                placeholder="Выберите язык"
              />
            )}
          />
        )}
      />

      <FormHelperText
        sx={{ textAlign: 'center', my: 1 }}
        error={!!errors['languages']}
      >
        {errors['languages'] ? 'Необходимо выбрать языки' : ''}
      </FormHelperText>
    </>
  )
}
