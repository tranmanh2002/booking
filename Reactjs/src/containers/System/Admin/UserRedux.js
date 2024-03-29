import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import{LANGUAGES, CRUD_ACTIONS, CommonUtils} from "../../../utils"
import { connect } from 'react-redux';
import * as actions from "../../../store/actions"
import './UserRedux.scss'
import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css'
import TableManageUser from './TableManageUser';

class UserRedux extends Component {

    constructor(props){
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgUrl: '',
            isOpen: false,

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',

            action: '',
            userEditID: '',

        }
    }
    

    async componentDidMount() {
        //truyền dữ liệu từ redux lên react
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
    }
    componentDidUpdate(prevProps, prevState, snapshot){
        
        if(prevProps.genderRedux !== this.props.genderRedux){
            let arrGenders = this.props.genderRedux
            this.setState({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : ''

            })
        }
        if(prevProps.roleRedux !== this.props.roleRedux){
            let arrRoles = this.props.roleRedux
            this.setState({
                roleArr: arrRoles,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : ''

            })
        }
        if(prevProps.positionRedux !== this.props.positionRedux){
            let arrPositions = this.props.positionRedux
            this.setState({
                positionArr: arrPositions,
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : ''

            })
        }
        if (prevProps.listUsers !== this.props.listUsers){
            //khi co thay doi nguoi dung, xet lai gia tri role, gender, position
            let arrGenders = this.props.genderRedux;
            let arrRoles = this.props.roleRedux;
            let arrPositions = this.props.positionRedux;

            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : '',
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : '',
                avatar: '',
                action: CRUD_ACTIONS.CREATE,
                previewImgUrl: ''
            })
        }
    }


    handleOnChangeImage = async(event) =>{
        let data = event.target.files;
        //lấy hình ảnh đầu tiên từ phần tử
        let file = data[0];
        if(file){
            //thư viện tự động chuyển đổi hình ảnh thành 1 file URL
            let base64 = await CommonUtils.getBase64(file);
            // console.log('check base64: ', base64)
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgUrl: objectUrl,
                avatar: base64
            })
        }
      
    }
    openPreviewImage = () =>{
        if(!this.state.previewImgUrl){
            return
        }else{
            this.setState({
                isOpen: true
            })
        } 
    }
    //check valid input
    checkValidateInput = () =>{
        let isValid = true;
        let arrCheck = ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'address']
        for(let i = 0; i< arrCheck.length; i++){
            if(!this.state[arrCheck[i]]){
                isValid = false;
                alert('dữ liệu đầu vào đã được yêu cầu' + arrCheck[i])
                break;
            }
           
        }
        return isValid;
    }
    //Lưu user
    handleSaveUser = () =>{
        let isValid = this.checkValidateInput();
        if(isValid === false){
            return;
        }
        let {action} = this.state;
        //fire redux action, check điều kiện
        if(action === CRUD_ACTIONS.CREATE){
            this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleID: this.state.role,
                positionID: this.state.position,
                avatar: this.state.avatar
            })
        }
        if(action === CRUD_ACTIONS.EDIT){
            this.props.editAnUserRedux({
                id: this.state.userEditID,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleID: this.state.role,
                positionID: this.state.position,
                avatar: this.state.avatar
            })
        }
    }
    //copy state
    onChangeInput = (event, id) =>{
        let copyState = {...this.state}
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }
    //edit user
    handleEditUserFromParent = (user) =>{
        let imageBase64 = '';
        //mã hóa ảnh sang kiểu b64 binary
        if(user.image){
            imageBase64 = new Buffer(user.image, 'base64').toString('binary');
        }
        this.setState({
            email: user.email,
            password: 'HARDCODE',
            firstName: user.firstName,
            lastName: user.lastName,
            address: user.address,
            phoneNumber: user.phoneNumber,
            gender: user.gender,
            roleID: user.roleID,
            positionID: user.positionID,
            avatar: '',
            previewImgUrl: imageBase64,
            action: CRUD_ACTIONS.EDIT,
            userEditID: user.id
        })
    }
    render() {
        let genders = this.state.genderArr;
        let positions = this.state.positionArr;
        let roles = this.state.roleArr;

        let {email, password, firstName, lastName,
        phoneNumber, address, gender, position, role, avatar} = this.state;
        // console.log('check render redux: ', genders)
        return (
            <div className='user-redux-container'>
                <div className='title'>Quản lý người dùng</div>
                <div className="user-redux-body" >
                    <div className='container'>
                        <div className='row'>
                        {this.state.action === CRUD_ACTIONS.EDIT ? 
                            <div className='col-12 create-edit-user'> Chỉnh sửa thông tin người dùng </div>
                            : 
                            <div className='col-12 create-edit-user'> Thêm mới người dùng </div>
                        }
                            <div className='col-6'>
                                <label>Email</label>
                                <input className='form-control' type='email'
                                    value={email}
                                    onChange={(event) => {this.onChangeInput(event, 'email')}}
                                    disabled = {this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                ></input>
                            </div>
                            <div className='col-6'>
                                <label>Password</label>
                                <input className='form-control' type='password'
                                    value={password}
                                    onChange={(event) => {this.onChangeInput(event, 'password')}}
                                    disabled = {this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                ></input>
                            </div>
                            <div className='col-6'>
                                <label>First name</label>
                                <input className='form-control' type='text'
                                    value={firstName}
                                    onChange={(event) => {this.onChangeInput(event, 'firstName')}}
                                ></input>
                            </div>
                            <div className='col-6'>
                                <label>Last name</label>
                                <input className='form-control' type='text'
                                    value={lastName}
                                    onChange={(event) => {this.onChangeInput(event, 'lastName')}}
                                ></input>
                            </div>
                            <div className='col-3'>
                                <label>Phone number</label>
                                <input className='form-control' type='text'
                                    value={phoneNumber}
                                    onChange={(event) => {this.onChangeInput(event, 'phoneNumber')}}
                                ></input>
                            </div>
                            <div className='col-6'>
                                <label>Address</label>
                                <input className='form-control' type='text'
                                    value={address}
                                    onChange={(event) => {this.onChangeInput(event, 'address')}}
                                ></input>
                            </div>
                            <div className='col-3'>
                                <label>Gender</label>
                                <select className='form-control'
                                    onChange={(event) => {this.onChangeInput(event, 'gender')}}
                                    value={gender}
                                >
                                    {genders && genders.length > 0 && genders.map((item, index) => {
                                        return(
                                            <option key={index} value={item.keyMap}>
                                                {item.valueVi}
                                            </option>
                                        )
                                    })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label>Position</label>
                                <select className='form-control'
                                    value={position}
                                    onChange={(event) => {this.onChangeInput(event, 'position')}}
                                >
                                    {positions && positions.length > 0 && positions.map((item, index) => {
                                        return(
                                            <option key={index} value={item.keyMap}>
                                                {item.valueVi}
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className='col-3'>
                                <label>RoleID</label>
                                <select className='form-control'
                                    value={role}
                                    onChange={(event) => {this.onChangeInput(event, 'role')}}
                                >
                                    {roles && roles.length > 0 && roles.map((item, index) => {
                                        return(
                                             //item.key: key của role
                                            <option key={index} value={item.keyMap}> 
                                                {item.valueVi}
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className='col-3'>
                                <label>Avatar</label>
                                <div className='preview-img-container'>
                                    <input type='file' id='previewImg' hidden
                                        onChange={(event) => this.handleOnChangeImage(event)}
                                    ></input>
                                    <label className='label-upload' htmlFor='previewImg'>Tải ảnh <i className='fas fa-upload'></i></label>
                                    <div className='preview-image'
                                        //truyền ảnh vào div
                                        style={{backgroundImage: `url(${this.state.previewImgUrl})`}}
                                        onClick={() => this.openPreviewImage()}
                                    ></div>
                                </div> 
                            </div>
                            <div className='col-12 my-3'>
                                <button 
                                    className={this.state.action === CRUD_ACTIONS.EDIT ? "btn btn-warning" : 'btn btn-primary'}
                                    onClick={() => this.handleSaveUser()}
                                >{this.state.action === CRUD_ACTIONS.EDIT ? 'Sửa' : 'Lưu lại'}</button>
                            </div>
                            <div className='col-12 mb-5'>
                                <TableManageUser
                                    handleEditUserFromParentKey = {this.handleEditUserFromParent}
                                    action={this.state.action}
                                ></TableManageUser>
                            </div>
                        </div>
                    </div>
                </div>
                {/* xét điều kiện open và mở ảnh */}
                {this.state.isOpen === true && 
                    <Lightbox
                        mainSrc={this.state.previewImgUrl}
                        onCloseRequest={() => this.setState({isOpen: false})}
                    />
                }
                
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        //lấy gender, role, position từ admin reducer
        genderRedux: state.admin.genders,
        isLoadingGender: state.admin.isLoadingGender,
        roleRedux: state.admin.roles,
        positionRedux: state.admin.positions,
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        editAnUserRedux: (data) => dispatch(actions.editAnUser(data))
        // processLogout: () => dispatch(actions.processLogout()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
