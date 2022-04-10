import { comment } from 'postcss';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deletecomment, editcomment } from '../../actions/post.actions';
import { UidContext } from '../AppContext';

const EditDeleteComment = ({ comment, postId }) => {

    const [isauth, setIsAuth] = useState(false);
    const [edit, setEdit] = useState(false);
    const [text, setText] = useState('');
    const uid = useContext(UidContext);
    const dispatch = useDispatch();

    const handleEdit = (e) => {
        e.preventDefault();
        if (text) {
            dispatch(editcomment(postId, comment._id, text));
            setText('');
            setEdit('');
        }
    }
    const handleDelete = () => {
       dispatch(deletecomment(postId,comment._id));
    }

    useEffect(() => {
        const checkAuthor = () => {
            if (uid === comment.commenterId) {
                setIsAuth(true);
            }
        }
        checkAuthor();
    }, [uid, comment.commenterId])

    return (
        <div className='edit-comment'>
            {isauth && edit === false && (
                <span onClick={() => setEdit(!edit)}>
                    <img src="./img/icons/edit.svg" alt="edit-comment" />
                </span>
            )}
            {isauth && edit && (
                <form action="" onSubmit={handleEdit} className='edit-comment-form'>
                    <label htmlFor='text' onClick={() => setEdit(!edit)}>Editer</label>
                    <br />
                    <input type="text"
                        name='text'
                        onChange={(e) => setText(e.target.value)}
                        defaultValue={comment.text}></input>
                    <br />
                    <div className="btn">
                        <span
                            onClick={() => {
                                if (window.confirm("Voulez-vous vraiment supprimer ce commentaire?")) {
                                    handleDelete();
                                }
                            }}
                        >
                            <img src="./img/icons/trash.svg" alt="trash" />
                        </span>
                        <input type="submit" value="Valider modifications" />
                    </div>
                </form>
            )}
        </div>
    )
}

export default EditDeleteComment;