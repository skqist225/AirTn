import MaterialTable from "@material-table/core";
import { tableIcons } from "../utils/tableIcon";
import { getImage } from "../helpers";
import MyNumberForMat from "../utils/MyNumberFormat";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import '../css/page/rooms.css'

const Rooms = ({ rooms }) => {

    const handleView = () => { }

    const handleEdit = () => {

    }

    const handleDelete = () => {

    }

    const roomColumns = [
        { title: "Id", field: "id", render: rowData => <div style={{ width: '50px' }}>{rowData.id}</div> },
        {
            title: "Name", field: "name", render: rowData => <div className='normal-flex' style={{ width: '300px' }}>
                <img src={getImage(rowData.thumbnail)} className='image' />
                <span className="listings__room-name">{rowData.name}</span>
            </div>
        },
        {
            title: "Status", field: "status", render: rowData => <>
                {rowData.status === true ? (
                    <div className='normal-flex'>
                        <div className='mr-10'>
                            <svg
                                viewBox='0 0 16 16'
                                xmlns='http://www.w3.org/2000/svg'
                                style={{
                                    display: "block",
                                    height: "16px",
                                    width: "16px",
                                    fill: "#008a05",
                                }}
                                aria-hidden='true'
                                role='presentation'
                                focusable='false'
                            >
                                <path d='M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zm3.159 4.869L6.67 9.355 4.42 7.105 3.289 8.236 6.67 11.62 12.291 6z'></path>
                            </svg>
                        </div>
                        <div>Available</div>
                    </div>
                ) : (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={getImage("/svg/reddot.svg")} size='10px' />
                        <span>Unavailable</span>
                    </div>
                )}
            </>
        },
        {
            title: "Host", field: "host"
        },
        {
            title: "Price", field: "price", render: rowData => <MyNumberForMat currency={rowData.currency} price={rowData.price} />
        },
        {
            title: "Location", field: "location", render: rowData => <span className="listings__td-text listings__room-name">{rowData.location}</span>
        },
        {
            title: "Created", field: "createdDate", render: rowData => <span className="listings__td-text">{rowData.createdDate}</span>
        },
        {
            title: "Action", field: "action", render: rowData => <div>
                <Stack spacing={2} direction="row">
                    <Link to={`/room/${rowData.id}`}>
                        <Button variant="text" onClick={handleView}>
                            <VisibilityIcon />
                        </Button>
                    </Link>
                    <Button variant="contained" onClick={handleEdit}>
                        <EditIcon />
                    </Button>
                    <Button variant="outlined" color="error" onClick={handleDelete}>
                        <DeleteIcon />
                    </Button>
                </Stack>

            </div>
        },
    ];

    return <MaterialTable title={"Rooms Details"} icons={tableIcons} columns={roomColumns} data={rooms}
        options={{
            headerStyle: { borderBottomColor: 'red', borderBottomWidth: '3px', fontFamily: 'verdana' },
            actionsColumnIndex: -1
        }}
    />;
}

export default Rooms;