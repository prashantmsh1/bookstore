import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const ShowBook = () => {
    const { id } = useParams();
    const [book, setBook] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:5000/books/${id}`)
            .then((response) => {
                setBook(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, [id]);

    return (
        <div className="p-4 ">
            <BackButton />
            <h1 className="my-4 text-3xl "> Show Book</h1>
            {loading ? (
                <Spinner />
            ) : (
                <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit">
                    <div className="my-4 ">
                        <span className="mr-4 text-xl text-gray-500 ">
                            {book._id}
                        </span>
                    </div>
                    <div className="my-4 ">
                        <span className="mr-4 text-xl text-gray-500 ">
                            {book.title}
                        </span>
                    </div>
                    <div className="my-4 ">
                        <span className="mr-4 text-xl text-gray-500 ">
                            {book.author}
                        </span>
                    </div>
                    <div className="my-4 ">
                        <span className="mr-4 text-xl text-gray-500 ">
                            {book.publishYear}
                        </span>
                    </div>
                    <div className="my-4 ">
                        <span className="mr-4 text-xl text-gray-500 ">
                            Create Time
                        </span>
                        <span>{new Date(book.createdAt).toString()}</span>
                    </div>
                    <div className="my-4 ">
                        <span className="mr-4 text-xl text-gray-500 ">
                            Updated Time
                        </span>
                        <span>{new Date(book.updatedAt).toString()}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShowBook;
