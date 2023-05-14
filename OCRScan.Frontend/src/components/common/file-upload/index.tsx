import React, {
  FC,
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import {
  Box,
  FormHelperText,
  IconButton,
  Stack,
  styled,
  Typography,
} from '@mui/material'
import { Delete } from '@mui/icons-material'
import { Controller, useController, useFormContext } from 'react-hook-form'
import Image from 'next/image'

const CustomBox = styled(Box)({
  '&.MuiBox-root': {
    backgroundColor: '#fff',
    borderRadius: '2rem',
    boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
  },
  '&.MuiBox-root:hover, &.MuiBox-root.dragover': {
    opacity: 0.6,
  },
})

interface Props {
  limit: number
  multiple: boolean
  fileType?: 'img' | 'pdf'
  name: string
}

export const FileUpload: FC<Props> = ({
  limit,
  multiple,
  fileType,
  name,
}: Props): ReactElement => {
  const {
    control,
    formState: { isSubmitting, errors },
  } = useFormContext()

  const inputFileAccept = () => {
    switch (fileType) {
      case 'img':
        return 'image/jpg, image/png, image/jpeg'
      case 'pdf':
        return 'application/pdf'
    }
  }

  const { field } = useController({ name, control })
  const [singleFile, setSingleFile] = useState<File[]>([])
  const [fileList, setFileList] = useState<File[]>([])
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    console.log(errors)
  }, [errors])

  const onDragEnter = () => wrapperRef.current?.classList.add('dragover')
  const onDragLeave = () => wrapperRef.current?.classList.remove('dragover')

  // 👇 Image Upload Service
  const onFileDrop = useCallback(
    (e: React.SyntheticEvent<EventTarget>) => {
      const target = e.target as HTMLInputElement
      console.log(target.files)
      if (!target.files) return

      if (limit === 1) {
        const newFile = Object.values(target.files).map((file: File) => file)
        if (singleFile.length >= 1) {
          return alert('Можно загрузить только одно изобаржение')
        }
        setSingleFile(newFile)
        field.onChange(newFile[0])
      }

      if (multiple) {
        const newFiles = Object.values(target.files).map((file: File) => file)
        if (newFiles) {
          const updatedList = [...fileList, ...newFiles]
          if (updatedList.length > limit || newFiles.length > 3) {
            return alert(`Image must not be more than ${limit}`)
          }
          setFileList(updatedList)
          field.onChange(updatedList)
        }
      }
    },
    [field, fileList, limit, multiple, singleFile]
  )

  const fileRemove = (file: File) => {
    const updatedList = [...fileList]
    updatedList.splice(fileList.indexOf(file), 1)
    setFileList(updatedList)
    field.onChange(updatedList)
  }

  const fileSingleRemove = () => {
    setSingleFile([])
    field.onChange(undefined)
  }

  type CustomType = 'jpg' | 'png' | 'svg'

  // 👇 Calculate Size in KiloByte and MegaByte
  const calcSize = (size: number) => {
    return size < 1000000
      ? `${Math.floor(size / 1000)} KB`
      : `${Math.floor(size / 1000000)} MB`
  }

  useEffect(() => {
    if (isSubmitting) {
      setFileList([])
      setSingleFile([])
      field.onChange(undefined)
    }
  }, [isSubmitting])

  return (
    <>
      <CustomBox>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{
            position: 'relative',
            width: '100%',
            height: '13rem',
            border: '2px dashed #4267b2',
            borderRadius: '20px',
          }}
          ref={wrapperRef}
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDrop={onDragLeave}
        >
          <Stack justifyContent="center" sx={{ p: 1, textAlign: 'center' }}>
            <Typography sx={{ color: '#ccc' }}>
              {fileType === 'pdf'
                ? 'Загрузите PDF-документ'
                : limit > 1
                ? 'Загрузите изображения'
                : 'Загрузите изображение'}
            </Typography>
            <div>
              <Image
                src="/cloud-upload.png"
                alt="file upload"
                width={80}
                height={80}
              />
            </div>
            <Typography variant="body1" component="span">
              <strong>Поддерживаемые типы</strong>
            </Typography>
            <Typography variant="body2" component="span">
              {fileType === 'img' ? 'JPG, JPEG, PNG' : 'PDF'}
            </Typography>
          </Stack>
          <Controller
            name={name}
            defaultValue=""
            control={control}
            render={({ field: { name, onBlur, ref } }) => (
              <input
                type="file"
                name={name}
                onBlur={onBlur}
                ref={ref}
                onChange={onFileDrop}
                multiple={multiple}
                accept={inputFileAccept()}
                style={{
                  opacity: 0,
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  cursor: 'pointer',
                }}
              />
            )}
          />
        </Box>
      </CustomBox>

      <FormHelperText
        sx={{ textAlign: 'center', my: 1 }}
        error={!!errors[name]}
      >
        {errors[name] ? 'Необходимо загрузить изображение' : ''}
      </FormHelperText>

      {/* 👇Image Preview 👇 */}
      {fileList.length > 0 || singleFile.length > 0 ? (
        <Stack spacing={2} sx={{ my: 2 }}>
          {(multiple ? fileList : singleFile).map((item, index) => {
            const imageType = item.type.split('/')[1] as CustomType
            return (
              <Box
                key={index}
                sx={{
                  position: 'relative',
                  backgroundColor: '#dfe5ff',
                  borderRadius: 1.5,
                  p: 0.5,
                }}
              >
                <Box display="flex">
                  {/*<img*/}
                  {/*  src={ImageConfig[`${imageType}`] || ImageConfig['default']}*/}
                  {/*  alt="uploaded image"*/}
                  {/*  style={{*/}
                  {/*    height: '3.5rem',*/}
                  {/*    objectFit: 'contain',*/}
                  {/*  }}*/}
                  {/*/>*/}
                  <Box sx={{ ml: 1 }}>
                    <Typography>{item.name}</Typography>
                    <Typography variant="body2">
                      {calcSize(item.size)}
                    </Typography>
                  </Box>
                </Box>
                <IconButton
                  onClick={() => {
                    if (multiple) {
                      fileRemove(item)
                    } else {
                      fileSingleRemove()
                    }
                  }}
                  sx={{
                    color: '#df2c0e',
                    position: 'absolute',
                    right: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                  }}
                >
                  <Delete />
                </IconButton>
              </Box>
            )
          })}
        </Stack>
      ) : null}
    </>
  )
}

FileUpload.defaultProps = {
  fileType: 'img',
}
