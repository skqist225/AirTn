import MaterialTable from "@material-table/core";
import { tableIcons } from "../utils/tableIcon";
import { callToast, getImage } from "../helpers";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TablePagination from "@material-ui/core/TablePagination";
import { Link } from "react-router-dom";
import "../css/page/rooms.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteUser, fetchUsers, userState } from "../features/user/userSlice";
import { Fab } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import NavigationIcon from '@mui/icons-material/Navigation';
import Toast from "../components/notify/Toast";

const UsersPage = () => {
    const dispatch = useDispatch();
    const [page, setPage] = useState(0);

    const {
        listing: { users, totalElements, totalPages, loading },
        deleteUserAction: { successMessage, errorMessage }
    } = useSelector(userState);

    const handleDelete = (id) => {
        dispatch(deleteUser(id));
    };

    const handlePageChange = (e, pn) => {
        dispatch(fetchUsers(pn + 1));
        setPage(pn);
    };

    useEffect(() => {
        if (successMessage) {
            callToast("success", successMessage)
            dispatch(fetchUsers(page + 1));
        }
    }, [successMessage])

    const roomColumns = [
        {
            title: "Id",
            field: "id",
            render: rowData => <div style={{ maxWidth: "20px" }}>{rowData.id}</div>,
        },
        {
            title: "Full Name",
            field: "fullName",
            render: rowData => (
                <div className='normal-flex' style={{ width: "300px" }}>
                    <img src={getImage(rowData.avatar)} className='image' />
                    <span className='listings__room-name'>{rowData.fullName}</span>
                </div>
            ),
        },
        {
            title: "Sex",
            field: "sex",
        },
        {
            title: "Birthday",
            field: "birthday",
        },
        {
            title: "Role",
            field: "role",
        },
        {
            title: "Phone Verified",
            field: "phoneVerified",
            render: rowData => <span>{rowData.phoneVerified}</span>,
        },
        {
            title: "Action",
            field: "action",
            render: rowData => (
                <div>
                    <Stack spacing={2} direction='row'>
                        <Link to={`/users/${rowData.id}`}>
                            <Button variant='text'>
                                <VisibilityIcon />
                            </Button>
                        </Link>
                        <Link to={`/edit/user/${rowData.id}`}>
                            <Button variant='contained'>
                                <EditIcon />
                            </Button>
                        </Link>
                        <Button variant='outlined' color='error' onClick={() => {
                            handleDelete(rowData.id);
                        }}>
                            <DeleteIcon />
                        </Button>
                    </Stack>
                </div>
            ),
        },
    ];

    return (
        <>
            <MaterialTable
                title={
                    <div className="h-20 flex items-center">
                        <div className="mr-5">
                            Total Records:{" "}
                            <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                                {totalElements}
                            </span>
                        </div>
                        <Link to={"/add/user"}>
                            <Fab variant="extended" color="primary" aria-label="add">
                                <AddIcon sx={{ mr: 1 }} />
                                Add User
                            </Fab>
                        </Link>
                    </div>
                }
                icons={tableIcons}
                columns={roomColumns}
                data={users}
                options={{
                    headerStyle: {
                        borderBottomColor: "red",
                        borderBottomWidth: "3px",
                        fontFamily: "verdana",
                    },
                    actionsColumnIndex: -1,
                    pageSizeOptions: [10],
                    pageSize: 10,
                    exportButton: true,
                }}
                components={{
                    Pagination: _ => (
                        <TablePagination
                            onChangePage={handlePageChange}
                            rowsPerPage={10}
                            page={page}
                            count={totalElements}
                        />
                    ),
                }}
            />
            <Toast />
        </>
    );
};

export default UsersPage;
