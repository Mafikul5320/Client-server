import React, { use, useState } from 'react';

const Users = ({ userPromise }) => {
    const USerLoad = use(userPromise)
    const [User, setUser] = useState(USerLoad)
    const HandelSubmit = (e) => {

        e.preventDefault()
        const Name = e.target.name.value;
        const Email = e.target.email.value;
        const NewUser = { Name, Email }
        console.log(NewUser)
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const CreateNewUSer = fetch("http://localhost:3000/users", {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(NewUser),

            // …
        }).then(res => res.json()).then(data => {
            console.log(data)
            if (data.insertedId) {
                console.log(NewUser._id)
                console.log(data.insertedId)
                NewUser._id = data.insertedId
                const CreateUser = [...User, NewUser]
                setUser(CreateUser)
                alert('User Added Successfully')
            }
        })
    };
    const HandelDelete = (id) => {
        console.log("user delete", id)
        fetch(`http://localhost:3000/users/${id}`, {
            method: "DELETE",
        }).then(res => res.json()).then(data => console.log(data))
    }
    return (
        <div>
            <div className=' flex justify-center mt-50 mb-20 '>
                <form onSubmit={HandelSubmit}>
                    <input type="text" placeholder="Name " name='name' className="input input-secondary" required />
                    <input type="text" placeholder="Email" name='email' className="input input-accent" required />                <input type="submit" value="submit" className='btn' />
                </form>

            </div>
            <div className='max-w-2xl mx-auto space-y-4'>
                {
                    User.map(data => <div className=' p-3  border-2 flex flex-col'> <h1>{data.Name}</h1>
                        <h1 className='text-amber-300'>{data.Email}</h1>
                        <button onClick={() => HandelDelete(data._id)} className='btn bg-indigo-500'>x</button></div>)
                }
            </div>
        </div>
    );
};

export default Users;