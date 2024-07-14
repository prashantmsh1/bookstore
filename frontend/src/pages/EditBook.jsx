import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const EditBook = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [publishYear, setPublishYear] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:5000/books/${id}`)
            .then((response) => {
                setTitle(response.data.title);
                setAuthor(response.data.author);
                setPublishYear(response.data.publishYear);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                alert("Error fetching book data");
                console.log(error);
            });
    }, [id]);
    const handleEditBook = () => {
        setLoading(true);
        const data = {
            title,
            author,
            publishYear,
        };
        axios
            .put(`http://localhost:5000/books/${id}`, data)
            .then(() => {
                setLoading(false);
                navigate("/");
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    };

    return (
        <div className="p-12 ">
            <BackButton />
            <h1 className="text-3xl "> Edit Book</h1>
            {loading ? <Spinner /> : null}
            <div className="flex *:flex *:flex-col w-2/5 mx-auto *:justify-start   flex-col p-8 border-2 border-sky-400">
                <div className="my-4 ">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        className="border-2 rounded-md border-sky-400"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="my-4 ">
                    <label htmlFor="author">Author</label>
                    <input
                        type="text"
                        id="author"
                        className="border-2 rounded-md border-sky-400"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    />
                </div>
                <div className="my-4 ">
                    <label htmlFor="publishYear">Publish Year</label>
                    <input
                        type="string"
                        id="publishYear"
                        className="border-2 rounded-md border-sky-400"
                        value={publishYear}
                        onChange={(e) => setPublishYear(e.target.value)}
                    />
                </div>
                <div className="my-4 ">
                    <button
                        onClick={handleEditBook}
                        className="px-4 py-2 text-white rounded-md bg-sky-800">
                        Edit Book
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditBook;
