import Spinner from "../components/Spinner";
import axios from "axios";
import { Link } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import { useState, useEffect } from "react";

const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
            .get("http://localhost:5000/books")
            .then((response) => {
                setBooks(response.data.books);
                console.log(response.data.books);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    return (
        <div className="w-full p-4 ">
            <div className="flex items-center justify-between">
                <h1 className="my-8 text-3xl ">Books List</h1>
                <Link to="/books/create">
                    <MdOutlineAddBox className="text-4xl text-sky-800" />
                </Link>
            </div>
            {loading ? (
                <Spinner />
            ) : (
                <table className="w-full ">
                    <thead>
                        <tr className=" gap-x-2">
                            <th className="mx-2 border rounded-md border-slate-600">
                                No
                            </th>
                            <th className="border rounded-md border-slate-600">
                                Title
                            </th>
                            <th className="border rounded-md border-slate-600 max-md:hidden">
                                Author
                            </th>
                            <th className="border rounded-md border-slate-600 max-md:hidden">
                                Publish Year
                            </th>
                            <th className="border rounded-md border-slate-600">
                                Operations
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book, index) => (
                            <tr className="*:text-center" key={book._id}>
                                <td className="border rounded-md border-slate-600">
                                    {index + 1}
                                </td>
                                <td className="border rounded-md border-slate-600">
                                    {book.title}
                                </td>
                                <td className="border rounded-md border-slate-600 max-md:hidden">
                                    {book.author}
                                </td>
                                <td className="border rounded-md border-slate-600 max-md:hidden">
                                    {book.publishYear}
                                </td>
                                <td className="border rounded-md border-slate-600">
                                    <div className="flex justify-center gap-x-4">
                                        <Link to={`/books/details/${book._id}`}>
                                            <BsInfoCircle className="mx-2 text-2xl text-sky-800" />
                                        </Link>
                                        <Link to={`/books/edit/${book._id}`}>
                                            <MdOutlineAddBox className="mx-2 text-2xl text-green-800" />
                                        </Link>
                                        <Link to={`/books/delete/${book._id}`}>
                                            <MdOutlineDelete className="mx-2 text-2xl text-red-800" />
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Home;
