import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchUser, userState } from "../features/user/userSlice";
import { Image } from "../globalStyle";
import { getImage } from "../helpers";
import Header from "../partials/Header";
import '../css/page/user_details.css'

function UserDetailsPage() {
    const dispatch = useDispatch();
    const {
        get: { user },
    } = useSelector(userState);
    const { userid } = useParams();


    useEffect(() => {
        dispatch(fetchUser(userid));
    }, []);

    return (
        <>
            <Header sidebarOpen={true} setSidebarOpen={false} />

            <main id='userDetailsPage'>
                <div className="flex">
                    <div style={{ flex: "1", maxWidth: "30%" }}>
                        <div id="udpleftBlock">
                            <div>
                                <Image src={getImage(user.avatarPath)} alt='' size="128px" className="mb-4" />
                                <div className="flex mb-4">
                                    <Image src={getImage("/svg/empty_star.svg")} size='20px' />
                                    <span>758 reviews</span>
                                </div>
                                <div className="flex mb-4">
                                    <Image
                                        src={getImage("/svg/identity_verified.svg")}
                                        size='20px'
                                    />{" "}
                                    <span>Identity verified</span>
                                </div>
                            </div>
                            <div>
                                <div className="mb-4 leading-7 text-2xl font-semibold">{user.lastName} confirmed</div>
                                <div className="flex w-full h-9" >
                                    <Image src={getImage("/svg/check.svg")} size='20px' className="mr-10" />{" "}
                                    <span>Identity</span>
                                </div>
                                <div className="flex w-full h-9">
                                    <Image src={getImage("/svg/check.svg")} size='20px' className="mr-10 " />{" "}
                                    <span>Email address</span>
                                </div>
                                <div className="flex w-full h-9">
                                    <Image src={getImage("/svg/check.svg")} size='20px' className="mr-10" />{" "}
                                    <span>Phone number</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ flex: "1", maxWidth: "10%" }} />
                    <div style={{ flex: "1", maxWidth: "50%" }} id="udpRightBlock">
                        <div>
                            <h1 className="h-9 font-semibold text-2xl">{user.fullName}</h1>
                            <div>Joined in {new Date(user.createdDate).getFullYear()}</div>
                        </div>

                        <div className="my-5">
                            <h1 className="h-9 font-semibold text-lg">About</h1>
                            <p style={{ fontSize: '16px', lineHeight: '20px' }}>{user.about}</p>
                        </div>

                        <div className="flex">
                            <Image src={getImage("/svg/home.svg")} size='20px' className="mr-10" />{" "}
                            <span className="text-base">Lives in {user.fullPathAddress}</span>
                        </div>

                    </div>
                </div>
            </main>
        </>
    );
}

export default UserDetailsPage;
