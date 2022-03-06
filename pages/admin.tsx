/** @jsxImportSource @emotion/react */
import React, {useState} from "react"
import type { NextPage } from 'next'
import { GetServerSideProps } from 'next'
import Table from '../components/common/table'
// Socket
import useSocket from '../service/useSocket'
// Styles
import * as style_utility from '../styles/utility/utility'
import * as style_btn from '../styles/components/sbtn'
import styles_util from '../styles/Utility.module.css'
// Form
import { useForm, SubmitHandler, FormProvider } from "react-hook-form"
import { AdminTemplate } from "@/components/template/Template"
import { ButtonGroupAdmin } from "@/components/mols/ButtonGroupAdmin"
import { InputText } from "@/components/atoms/InputText"
import { RegisterForm } from "@/components/args/RegisterForm"


type TableData = {
    id:number,
    question:string,
    select1_text:string,
    select1_imgpath:string,
    select2_text:string,
    select2_imgpath:string,
    select3_text:string,
    select3_imgpath:string,
    select4_text:string,
    select4_imgpath:string,
    answer:string
}

type TableDatas = {
    rows:TableData[]
}

type imgPath = {
    img_path1: string,
    img_path2: string,
    img_path3: string,
    img_path4: string,
}

type IFormInputs = {
  question: string,
  select1: string,
  select2: string,
  select3: string,
  select4: string,
  answer: string
}

type ButtonProps = {
    step: Number
}

const DISPLAY_TITLE_EVENT = "displayTitleEvent"
const DISPLAY_SELECTION_EVENT = "displaySelectionEvent"
const DISPLAY_ANSWER_CHECK_EVENT = "displayAnswerCheckEvent"
const DISPLAY_ANSWER_EVENT = "displayAnswerEvent"
const DISPLAY_END = 'displayEnd' 

const Home:NextPage = ({data}:any) => {
    const [hasError, setHasError] = useState<boolean>(false)
    const [question, setQuestion] = useState("")
    const [select1, setSelect1] = useState("")
    const [select2, setSelect2] = useState("")
    const [select3, setSelect3] = useState("")
    const [select4, setSelect4] = useState("")
    const [answer, setAnswer] = useState("")
    const [rowsdata, setRowsData] = useState<TableData[]>(data)
    const [row, setRow] = React.useState("0")
    const [imgPaths, setImgPaths] = React.useState([])
    const {id, step, sendStep, enableVote, resetVote} = useSocket()

    // react-hook-form
    const methods = useForm<IFormInputs>({
        mode: "onChange",
        criteriaMode: "all",
        shouldFocusError: false
    })
    const onSubmit: SubmitHandler<IFormInputs> = async input => {
        console.log(input)
        if(methods.formState.errors.answer){
            console.log('answer error')
            return
        }

        if(!input.question || !input.select1 || !input.select2 || !input.select3 || !input.select4 || !input.answer) {
            console.log("errors")
            console.log(methods.formState.errors)
            return
        }
        // 問題新規登録
        await saveQuestion(input)
        // テーブル更新
        updateTable()

        // Form Reset
        methods.reset()
    }

    // 問題新規保存
    const saveQuestion = async (input:IFormInputs) => {
        const data = {
            question: input.question,
            select1_text:input.select1,
            select1_imgpath:"",
            select2_text:input.select2,
            select2_imgpath:"",
            select3_text:input.select3,
            select3_imgpath:"",
            select4_text:input.select4,
            select4_imgpath:"",
            answer:input.answer
        }
        await fetch(`/api/questions/create`, {
            method: 'POST', // or 'PUT'
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Save Data!!:', data)
            
        })
        .catch((error) => {
            console.error('Save Error!!:', error)
        })
    }
    // DBを更新
    const updateQuestion = async (tableData:TableData) => {
        const data = {
            id: tableData.id,
            question: tableData.question,
            select1_text:tableData.select1_text,
            select1_imgpath:tableData.select1_imgpath,
            select2_text:tableData.select2_text,
            select2_imgpath:tableData.select2_imgpath,
            select3_text:tableData.select3_text,
            select3_imgpath:tableData.select3_imgpath,
            select4_text:tableData.select4_text,
            select4_imgpath:tableData.select4_imgpath,
            answer:tableData.answer
        }
        await fetch(`/api/questions/update`, {
            method: 'POST', // or 'PUT'
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Update Data!!:', data)
            
        })
        .catch((error) => {
            console.error('Update Error!!:', error)
        })

    }

    // 表を更新
    const updateTable = () => {
        getQuestions()
        .then(response => response.json())
        .then(data => {
            console.log('tableData:', data)
            setRowsData((prevRowsData:TableData[]) => {
                return [...data]
            })
        })
        .catch((error) => {
            console.error('Error:', error)
        })
    }

    // 問題をDBから取得
    const getQuestions = async () => {
        return await fetch(`/api/questions/all`)
    }

    // row行目の問題を削除
    const deleteQuestion = async () => {
        console.log(row+"行目のデータを削除します")
        const rowNum = parseInt(row)
        const targetData = rowsdata[rowNum]
        console.log('targetData')
        console.log(targetData)
        const targetId = targetData.id
        console.log('targetData')
        console.log(targetData)
        console.log('targetId')
        console.log(targetId)
        const data = { id: targetId }

        await fetch(`/api/questions/delete`, {
            method: 'POST', // or 'PUT'
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Delete Data!!:', data)
            updateTable()
        })
        .catch((error) => {
            console.error('Delete Error!!:', error)
        })
    }

    //問題を全削除する
    const deleteAllQuestion = async () => {
        const res = await fetch('/api/questions/deleteall')
        const {message} = await res.json()
        console.log('delete all question:'+message)
    }

    //テーブルをリセットする
    const resetTable = async () => {
        await deleteAllQuestion()
        updateTable()
    }

    // 画像をアップロード
    const handleUploadPhoto = async (e:any, index:string, rowNum:string) => {
        const file = e.target.files[0]
        const filename = encodeURIComponent(file.name)
        const res = await fetch(`/api/upload-url?file=${filename}`)
        const { url, fields } = await res.json()
        const formData = new FormData()
        const data = {...fields, file}
        Object.keys(data).forEach((key) => {
            formData.append(key, data[key])
        })

        const upload = await fetch(url, {
            method: 'POST',
            body: formData,
        })

        if (upload.ok) {
            console.log('Uploaded successfully!')
            console.log('Table Update')
            const rowNumInt = parseInt(rowNum) // 選択している行
            const selectNum = parseInt(index) // 対象select
            const imgS3Path = url + "/" + filename

            setRowsData((prevRowsData:TableData[]) => {
                let aftRowsData = prevRowsData.map( list => ({...list}))
                if(selectNum == 0) {aftRowsData[rowNumInt].select1_imgpath = imgS3Path}
                else if(selectNum == 1) {aftRowsData[rowNumInt].select2_imgpath = imgS3Path}
                else if(selectNum == 2) {aftRowsData[rowNumInt].select3_imgpath = imgS3Path}
                else if(selectNum == 3) {aftRowsData[rowNumInt].select4_imgpath = imgS3Path}

                updateQuestion(aftRowsData[rowNumInt])
                .then(data => {
                    console.log('Update Tablle!!:', data)
                    updateTable()
                })
                .catch((error) => {
                    console.error('Update Table Error!!:', error)
                })

                return [...aftRowsData]
            })


        } else {
            console.error('Upload failed.')
        }
    }

    const onChangeRadio = (e:React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value)
        setRow(e.target.value)
    }

    const display = (step: Number) => {
        const rowNum = parseInt(row)
        const id = rowsdata[rowNum].id
        console.log('id='+id+'の問題を表示します')
        console.log(step)
        if(step==1){
            sendStep(id, DISPLAY_TITLE_EVENT)
        }else if(step==2) {
            //投票受付開始
            enableVote(true)
            sendStep(id, DISPLAY_SELECTION_EVENT)
        }else if(step==3) {
            sendStep(id, DISPLAY_ANSWER_CHECK_EVENT)
        }else if(step==4) {
            sendStep(id, DISPLAY_ANSWER_EVENT)
        }else if(step==5) {
            resetVote()
            sendStep(id, DISPLAY_END)
        }
    }

    return (
        <AdminTemplate>
            <RegisterForm onSubmit={onSubmit} />        
            <ButtonGroupAdmin onClickDisplay={display} deleteQuestion={deleteQuestion} />
            <div>
                <Table rows={rowsdata} onChangeRadio={onChangeRadio} handleUploadPhoto={handleUploadPhoto}></Table>
                <button css={style_utility.float_right} onClick={() => resetTable()}>テーブルリセット</button>
            </div>
        </AdminTemplate>
    )
}

// This gets called on every request
export const getServerSideProps:GetServerSideProps = async (context) => {
  // Fetch data from external API
  const res = await fetch(`http://127.0.0.1:3000/api/questions/all`)
  const rtn = await res.json()

  console.log('serversideprops:')
  console.log(rtn)
  let data
  if("message" in rtn) {
      console.log('No Database')
      data = [{
        id:0,
        question:"",
        select1_text:"",
        select1_imgpath:"",
        select2_text:"",
        select2_imgpath:"",
        select3_text:"",
        select3_imgpath:"",
        select4_text:"",
        select4_imgpath:"",
        answer:""
      }]

  }else{
      data = rtn
  }
  // Pass data to the page via props
  return { props: { data } }
}

export default Home
