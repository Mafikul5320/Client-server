import React from 'react';

const Users = () => {
    const HandelSubmit = (e) => {
        e.preventDefault()
        const Name = e.target.name.value;
        const Email = e.target.email.value;
        const NewUser = { Name, Email }
        console.log(NewUser)
        const CreateUser = fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(NewUser),

        }).then(res => res.json()).then(data => {
            console.log(data)
        })
    }
    return (
        <div className=' flex justify-center min-h-screen  items-center '>
            <form onSubmit={HandelSubmit}>
                <input type="text" placeholder="Name " name='name' className="input input-secondary" />
                <input type="text" placeholder="Email" name='email' className="input input-accent" />                <input type="submit" value="submit" className='btn' />
            </form>
        </div>
    );
};

export default Users;