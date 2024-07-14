import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const DeleteBook = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            axios
                .delete(`http://localhost:5000/books/${id}`)
                .then(() => {
                    navigate("/");
                    setLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                    setLoading(false);
                });
        }, 2000);
    }, [id]);

    return <div>{loading ? <h1>Deleting...</h1> : <h1>Book Deleted</h1>}</div>;
};

export default DeleteBook;
