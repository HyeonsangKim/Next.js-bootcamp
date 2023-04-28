import { useMutation,gql } from "@apollo/client"
import { useState } from "react"

const CREATE_PRODUCT = gql`
    mutation createProduct($seller: String, $createProductInput: CreateProductInput!) { # 타입적는곳
        createProduct(seller: $seller,createProductInput: $createProductInput){     # 실제 우리가 전달할 변수 적는 곳
            _id
            number
            message
        }
    }
`

export default function GraphMutationPage(){

    const [myFunction] = useMutation(CREATE_PRODUCT)

    const onClickSubmit = async () => {
        const result =  await myFunction({
            variables: {
                seller: "Dummy",
                createProductInput: {
                    name: "마우스",
                    detail: "it is really good",
                    price: 3000
                }
            }
        })
        console.log(result);
    }

    return (
        <>
            <button onClick={onClickSubmit}>GraphQL(동기) 요청</button>       
        </>
    )
}