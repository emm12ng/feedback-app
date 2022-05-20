import {createContext, useState} from 'react'
import { v4 as uuidv4} from 'uuid'

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
    const [feedback, setFeedback] = useState([
        {
            id: 1,
            text: 'feedback item 1',
            rating: 4
        },
        {
            id: 2,
            text: 'feedback item 2',
            rating: 9
        },
        {
            id: 3,
            text: 'feedback item 3',
            rating: 2
        },
    ])

    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false,
    })
    const deleteFeedback = (id) => {
        if (window.confirm('Are you sure you want to delete?')) {
            setFeedback(feedback.filter((item) => item.id !== id))
        }
    }

    const updateFeedback = (id, updItem) => {
        setFeedback(feedback.map((item) => item.id===id ? {...item, ...updItem} : item))
    }
    const addFeedback = (newFeedback) => {
        newFeedback.id = uuidv4()
        console.log(newFeedback)
        setFeedback([newFeedback,...feedback])
    }

    const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit: true,
        })
    }
    return (
    <FeedbackContext.Provider value={{
        feedback,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
        feedbackEdit,
    }}>
        {children}
    </FeedbackContext.Provider>
)}

export default FeedbackContext