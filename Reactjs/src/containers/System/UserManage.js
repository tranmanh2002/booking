import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import {getAllUsers, createNewUserService, deleteUserService, editUserService} from '../../services/userService';
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';

import { emitter } from '../../utils/emitter';

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            //khi nguoi dung nhan them nguoi dung, isOpenModalUser = true
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            userEdit: {},
        }
    }

    async componentDidMount() {
        await this.getAllUsers('ALL');
        
    }

    //lấy tất cả thông tin của user
    getAllUsers = async() =>{
        let response = await getAllUsers('ALL');
        if(response && response.errCode === 0){
            this.setState({
                arrUsers: response.users
            })

        }
    }

    //mở modal add user
    handleAddNewUser = () =>{
        this.setState({
            isOpenModalUser: true,
        })
    }

    //đóng mở toggle
    toggleUserModal = () =>{
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        })
    }
    toggleUserEditModal = () =>{
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser,
        })
    }
    //tạo người dùng mới
    createNewUser = async(data) =>{
        // console.log('check data from child: ', data)
        try{
            let response = await createNewUserService(data);
            if(response && response.errCode !== 0){
                alert(response.errMessage)
            }else{
                await this.getAllUsers();
                alert(response.message);
                this.setState({
                    isOpenModalUser: false
                })
                //hàm clear data sau khi thêm người dùng
                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }
            // console.log(response)
        }catch(e){
            console.log(e)
        }
    }
    //xóa người dùng
    handleDeleteUser = async(user) =>{
        console.log('Click', user)
        try {
            let res = await deleteUserService(user.id);
            if(res && res.errCode === 0){
                await this.getAllUsers();
            }
        } catch (error) {
            console.log(error)
        }
    }

    handleEditUser = (user) =>{
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user
        })
    }
    doEditUser = async(user) =>{
        try {
            let res = await editUserService(user);
            if(res && res.errCode === 0){
                this.setState({
                    isOpenModalEditUser: false
                })
                await this.getAllUsers()
            }else{
                alert(res.errMessage)
            }
        } catch (error) {
            console.log(error)
        }
        // console.log('click save user: ', user)
    }
    /* life cycle of reactjs
    *run component:
    *1. run constructor -> khởi tạo trạng thái ban đầu
    *2. Run didmount
    *3. Render
    */
    render() {
        let arrUsers = this.state.arrUsers;
        return (
            <div className="user-container">
                <ModalUser
                    isOpen = {this.state.isOpenModalUser}
                    toggleFromParent = {this.toggleUserModal}
                    createNewUser = {this.createNewUser}
                ></ModalUser>
                {this.state.isOpenModalEditUser && 
                    <ModalEditUser
                        isOpen = {this.state.isOpenModalEditUser}
                        toggleFromParent = {this.toggleUserEditModal}
                        currentUser = {this.state.userEdit}
                        editUser = { this.doEditUser}
                    ></ModalEditUser>
                }
                <div className='title text-center'> Manage users</div>
                <div className='mx-3 '>
                    <button className='btn btn-primary px-3' 
                    onClick = {() => this.handleAddNewUser()}
                    ><i className='fas fa-plus'> Add new users</i></button>
                </div>
                <div className='user-table mt-3 mx-1'>
                <table id="customers">
                <tbody>
                    <tr>
                        <th>Email</th>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Address</th>
                        <th>Actions</th>

                    </tr>
                    
                        { arrUsers && arrUsers.map((item, index) =>{
                            return(
                                <tr>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td>
                                    {/* font awesome */}
                                        <button className='btn-edit' onClick={() => this.handleEditUser(item)}> <i className='fas fa-pencil-alt'></i></button>
                                        <button className='btn-delete' onClick = {() => this.handleDeleteUser(item)}> <i className='fas fa-trash-alt'></i></button>

                                    </td>

                                </tr>
                            )
                        })
                        
                        }
                </tbody>
                        
                  
                    
                </table>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
