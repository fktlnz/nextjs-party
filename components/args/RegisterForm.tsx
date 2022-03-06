/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { Button } from "@/components/atoms/Button"
import { useForm, SubmitHandler, FormProvider } from "react-hook-form"
import { InputText } from "../atoms/InputText"

//utility
import * as style_utility from '@/styles/utility/utility'

type IFormInputs = {
  question: string,
  select1: string,
  select2: string,
  select3: string,
  select4: string,
  answer: string
}

type Props = {
    onSubmit: (input: IFormInputs) => void
}

export const RegisterForm = (props:Props) => {
    const methods = useForm<IFormInputs>({
        mode: "onChange",
        criteriaMode: "all",
        shouldFocusError: false
    })
    
    return (
        <section css={style_utility.mb30}>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(props.onSubmit)}>
                    <InputText
                        name="question"
                        css={style_utility.mb10}
                        placeholder="問題文を入力してください"
                        registerOptions={{
                            required: true
                        }}
                    />
                    <InputText
                        name="select1"
                        css={style_utility.mb10}
                        placeholder="選択肢１を入力してください"
                        registerOptions={{
                            required: true
                        }}
                    />
                    <InputText
                        name="select2"
                        css={style_utility.mb10}
                        placeholder="選択肢２を入力してください"
                        registerOptions={{
                            required: true
                        }}
                    />
                    <InputText
                        name="select3"
                        css={style_utility.mb10}
                        placeholder="選択肢３を入力してください"
                        registerOptions={{
                            required: true
                        }}
                    />
                    <InputText
                        name="select4"
                        css={style_utility.mb10}
                        placeholder="選択肢４を入力してください"
                        registerOptions={{
                            required: true
                        }}
                    />
                    <div css={style_utility.mb10}>
                        <InputText
                            name="answer"
                            placeholder="解答を入力してください(1-4)"
                            registerOptions={{
                                required: true,
                                pattern: /[1-4]/,
                                min: 1,
                                max: 4
                            }}
                        />
                        <p css={style_utility.text_warning}>{(methods.formState.errors.answer?.type=="max" || methods.formState.errors.answer?.type=="min" || methods.formState.errors.answer?.type=="pattern")  && "1-4で入力してください"}</p>
                    </div>
                    <Button type="submit">作成</Button>
                </form>
            </FormProvider>
        </section>
    )
}
