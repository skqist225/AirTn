import MaterialTable from "@material-table/core";
import { tableIcons } from "../utils/tableIcon";
import { getImage } from "../helpers";
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
import { fetchUsers } from "../features/user/userSlice";

const UsersPage = () => {
    const dispatch = useDispatch();
    const [page, setPage] = useState(0);

    const {
        listing: { users, totalElements, totalPages, loading },
    } = useSelector(state => state.user);

    const handleView = () => { };

    const handleEdit = () => { };

    const handleDelete = () => { };

    const handlePageChange = (e, pn) => {
        dispatch(fetchUsers(pn + 1));
        setPage(pn);
    };

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
            // <div
            //     style={{ maxWidth: "200px" }}
            //     className='listings__td-text listings__room-name'
            // >
            //     {rowData.location}
            // </div>
        },
        {
            title: "Action",
            field: "action",
            render: rowData => (
                <div>
                    <Stack spacing={2} direction='row'>
                        <Link to={`/room/${rowData.id}`}>
                            <Button variant='text' onClick={handleView}>
                                <VisibilityIcon />
                            </Button>
                        </Link>
                        <Button variant='contained' onClick={handleEdit}>
                            <EditIcon />
                        </Button>
                        <Button variant='outlined' color='error' onClick={handleDelete}>
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
                    <>
                        Total Records:{" "}
                        <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                            {totalElements}
                        </span>
                    </>
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
        </>
    );
};

export default UsersPage;
