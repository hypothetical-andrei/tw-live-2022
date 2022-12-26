import { useEffect, useState } from 'react'

function UpdateChild (props) {
    const { item } = props
    const [content, setContent] = useState({})

    const getPost = async (id) => {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        const data = await response.json()
        setContent(data)
    }

    useEffect(() => {
        getPost(item)
    }, [item])

    return (
        <div>
            for <b>{item}</b> content is <b>{content.title}</b>
        </div>
    )
}

export default UpdateChild