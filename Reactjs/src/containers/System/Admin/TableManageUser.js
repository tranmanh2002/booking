import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions"
import './TableManageUser.scss'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

const mdParser = new MarkdownIt();

function handleEditorChange({html, text}) {
    console.log('handleEditorChange: ', html, text);
}

class TableManageUser extends Component {

    constructor(props){
        super(props);
        this.state = {
            usersRedux: [],

        }
    }
    

    async componentDidMount() {
        //truyền dữ liệu từ redux lên react
        this.props.fetchUserRedux();
       

    }
    //phat hien su thay doi, tu dong cap nhat lại list user
    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.listUsers !== this.props.listUsers){
            this.setState({
                usersRedux: this.props.listUsers,

            })
        }
    }
    handleDeleteUser = (user) =>{
        this.props.deleteAnUserRedux(user.id)
    }
    handleEditUser = (user) =>{
        this.props.handleEditUserFromParentKey(user)
    }
    render() {
        let arrUsers = this.state.usersRedux;

        return (
            <React.Fragment>
                <table id='TableManageUser'>
                    <tbody>
                        <tr>
                            <th>Email</th>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                        {arrUsers && arrUsers.length>0 &&
                            arrUsers.map((item, index) =>{
                                return(
                                    <tr key={index}>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button 
                                                onClick={() => this.handleEditUser(item)}
                                                className='btn-edit'><i className='fas fa-pencil-alt'></i></button>
                                            <button
                                                onClick={() => this.handleDeleteUser(item)}    
                                                className='btn-delete'><i className='fas fa-trash'></i></button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        //lấy gender, role, position từ admin reducer
       listUsers: state.admin.users

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        deleteAnUserRedux: (id) => dispatch(actions.deleteAnUser(id)),
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
