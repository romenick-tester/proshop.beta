import React, { useEffect } from 'react';
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../manager";
import { Table, Button } from "react-bootstrap";
import { Loader, Message } from "../components";
import { FaCheck, FaEdit, FaTimes, FaTrash } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';

function UserListDisplay() {

    const dispatch = useDispatch();
    const usersList = useSelector(state => state.usersList);
    const { loading, error, list: users } = usersList;

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    if (loading) {
        return <Loader />
    }

    if (error) {
        return <Message variant="danger">{error}</Message>
    }

    const deleteUserHandler = (userId) => {
        console.log(userId);
    }

    return (
        <Table striped bordered hover responsive className="table-sm">
            <THEAD>
                <tr>
                    <th>
                        <h2>USERS</h2>
                    </th>
                </tr>
                <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>EMAIL</th>
                    <th>ADMIN</th>
                    <th></th>
                </tr>
            </THEAD>
            <TBODY>
                {users.map((user) => {
                    const { _id, name, email, isAdmin } = user;

                    return (
                        <tr key={_id}>
                            <td>{_id}</td>
                            <td>{name}</td>
                            <td>
                                <a href={`mailto:${email}`}>{email}</a>
                            </td>
                            <td>{isAdmin ? <FaCheck className="admin-check" /> : <FaTimes className="admin-x" />}</td>
                            <td>
                                <LinkContainer to={`/user/${user._id}/edit`} >
                                    <Button variant="light" className="btn-sm">
                                        <FaEdit />
                                    </Button>
                                </LinkContainer>
                                <Button variant="danger" className="btn-sm" onClick={() => deleteUserHandler(_id)}>
                                    <FaTrash />
                                </Button>
                            </td>
                        </tr>
                    )
                })}
            </TBODY>
        </Table>
    )
}

const THEAD = styled.thead`
    text-align: center;
    background: #333;
    color: white;
`

const TBODY = styled.tbody`
    text-align: center;
`

export default UserListDisplay;
