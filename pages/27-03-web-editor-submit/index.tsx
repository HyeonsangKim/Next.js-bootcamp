// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import {useForm} from "react-hook-form"

const ReactQuill = dynamic(async ()=> await import("react-quill"), {ssr: false})

export default function WebEditorPage(){
    const { register, handleSubmit, setValue, trigger } = useForm({
        mode: "onChange",
    })

    const onChangeContents = (value: string) => {
        console.log(value);

        // register로 등록하지 않고 강제로 값을 넣어주는 기능
        setValue('contents',value)
        void trigger("contents")
    }

    const onClickSubmit = () => {
        // const { Modal } = dynamic(async ()=> await import("antd"), {ssr: false})
        // Modal.success({content: "등록에 성공하였습니다!"})
    }

    return (
        <div>
            작성자: <input type="text" {...register("writer")}/><br/>
            비밀번호: <input type="password" {...register("password")}/><br/>
            제목: <input type="text" {...register("title")}/><br/>
            내용: <ReactQuill onChange={onChangeContents}/><br/>
            <button onClick={onClickSubmit}>등록하기</button>
        </div>
    )
}