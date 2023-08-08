import React, { useState } from "react";


const Home = () => {

    const [inputs, setInputs] = useState({
        name: "",
        email: ""
    });
    const [tableData, setTableData] = useState([]);
    const [editClick, setEditClick] = useState(false);
    const [editIndex, setEditIndex] = useState("");

    const handleChange = (event) => {
        setInputs({
            ...inputs,
            [event.target.name]: event.target.value,
        })
    }
    const handleSubmit = (event) => {
        event.preventDefault();

        if(editClick){
            const tempTableData = tableData;
            Object.assign(tempTableData[editIndex], inputs);
            setTableData([...tempTableData]);
            setEditClick(false);
            setInputs({
                name: "",
                email: ""
            });
        }
        else{
            if(inputs.name != '' && inputs.email){
                setTableData([...tableData, inputs]);
                setInputs({
                    name: "",
                    email: ""
                });
            }
            
        }
    }

    const deleteHandler = (index) => {
        const filterData = tableData.filter((item, i) => i !== index);
        setTableData(filterData);
    }
    const editHandler = (index) => {
        const tempData = tableData[index];
        setInputs({
            name: tempData.name,
            email: tempData.email
        });
        setEditClick(true);
        setEditIndex(index)
    }

    return (
    <div>
        <h1 className="text-center my-5">Crud App</h1>

        <div className="container">
            {/* Form Section */}
            <form action="" className="w-50 mx-auto form" onSubmit={handleSubmit}>
                <div className="form-group my-3">
                    <label htmlFor="Name">Name</label>
                    <input type="text" name="name" className="form-control"
                    value={inputs.name} onChange={handleChange} />
                </div>
                <div className="form-group my-3">
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" className="form-control"
                    value={inputs.email} onChange={handleChange} />
                </div>

                <div className="text-center">
                    <button>{editClick? "Update" : "Add Data"}</button>
                </div>

            </form>

            {/* View Sectiom */}
            <div className="mt-5">
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>

                        {
                            tableData.map((item, index) => (
                                <tr>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td><button className="btn btn-info mt-3"
                                    onClick={() => editHandler(index)}>Edit</button>
                                        <button className="btn btn-danger mt-3"
                                        onClick={() => deleteHandler(index)}>Delete</button>
                                    </td>
                                </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    </div>
    )


}

export default Home;