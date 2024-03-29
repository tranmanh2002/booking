import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions"
import './ManageDoctor.scss'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { CRUD_ACTIONS } from '../../../utils';
import { getDetailInforDoctor } from '../../../services/userService';

const mdParser = new MarkdownIt();

function handleEditorChange({html, text}) {
    console.log('handleEditorChange: ', html, text);
}

class ManageDoctor extends Component {

    constructor(props){
        super(props);
        this.state = {
            //lưu vào markdown table
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            description: '',
            listDoctors: [],
            hasOldData: false,

            //lưu vào doctor_infor table
            listPrice: [],
            listPayment: [],
            listProvince: [],
            listClinic: [],
            listSpecialty: [],

            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            selectedClinic: '',
            selectedSpecialty: '',

            nameClinic: '',
            addressClinic: '',
            note: '',
            clinicID: '',
            specialtyID: '',
        }
    }
    

    async componentDidMount() {
        //gọi lấy dữ liệu
        this.props.fetchAllDoctors();
        // let propsDoctor = this.props.fetchAllDoctors();
        // console.log("check props all doctor: ", propsDoctor)
        this.props.getAllRequiredDoctorInfor();
    }
    //Lấy danh sách bác sĩ vào select bác sĩ
    buildDataInputSelect = (inputData, type) =>{
        let result = [];
        if (inputData && inputData.length > 0){
            if(type === 'USERS'){
                inputData.map((item, index) =>{
                    let object = {};
                    let labelVi = `${item.firstName} ${item.lastName}`;
                    object.label = labelVi;
                    object.value = item.id;
                    result.push(object)
                })
            }
            if(type === 'PRICE'){
                inputData.map((item, index) =>{
                    let object = {};
                    let labelVi = `${item.valueVi}`;
                    object.label = labelVi;
                    object.value = item.keyMap;
                    result.push(object)
                })
            }
            if(type === 'PAYMENT' || type === 'PROVINCE'){
                inputData.map((item, index) =>{
                    let object = {};
                    let labelVi = `${item.valueVi}`;
                    object.label = labelVi;
                    object.value = item.keyMap;
                    result.push(object)
                })
            }
            if(type === 'SPECIALTY'){
                inputData.map((item, index) =>{
                    let object = {};
                    object.label = item.name;
                    object.value = item.id;
                    result.push(object)
                })
            }
            if(type === 'CLINIC'){
                inputData.map((item, index) =>{
                    let object = {};
                    object.label = item.name;
                    object.value = item.id;
                    result.push(object)
                })
            }
        }
        return result;
    }
    //phat hien su thay doi, tu dong cap nhat lại infor doctor
    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.allDoctors !== this.props.allDoctors){
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS')
            this.setState({
                listDoctors: dataSelect
            })
        }
        if(prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor){
            let {resPayment, resPrice, resProvince, resSpecialty, resClinic} = this.props.allRequiredDoctorInfor;

            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE');
            let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT');
            let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE');
            let dataSelectSpecialty = this.buildDataInputSelect(resSpecialty, 'SPECIALTY');
            let dataSelectClinic = this.buildDataInputSelect(resClinic, 'CLINIC');

            // console.log('check data: ', dataSelectPrice,  dataSelectPayment, dataSelectProvince)
            
            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
                listSpecialty: dataSelectSpecialty,
                listClinic: dataSelectClinic,

            })
        }
    }
    handleEditorChange = ({text, html}) =>{
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    }
    //lưu thông tin bác sĩ
    handleSaveContentMarkdown = () =>{
        let {hasOldData} = this.state;

        this.props.saveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            //id doctor theo select doctor
            doctorID: this.state.selectedOption.value,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note,
            clinicID: this.state.selectedClinic && this.state.selectedClinic.value ? this.state.selectedClinic.value : '',
            specialtyID: this.state.selectedSpecialty.value

        })
    }
    handleChangeSelect = async(selectedOption) =>{
        this.setState({selectedOption});
        let {listPayment, listPrice, listProvince, listSpecialty, listClinic} = this.state;
        let res = await getDetailInforDoctor(selectedOption.value);
        if(res && res.errCode === 0 && res.data && res.data.Markdown){
            let markdown = res.data.Markdown;
            let addressClinic = '', nameClinic = '', note = '',
            paymentID = '', priceID = '', provinceID = '', specialtyID = '', clinicID = '',
            selectedPayment = '', selectedPrice = '', selectedProvince = '', selectedSpecialty = '', selectedClinic = '';

            if(res.data.Doctor_Infor){
                addressClinic = res.data.Doctor_Infor.addressClinic;
                nameClinic = res.data.Doctor_Infor.nameClinic;
                note = res.data.Doctor_Infor.note;

                paymentID = res.data.Doctor_Infor.paymentID;
                priceID = res.data.Doctor_Infor.priceID;
                provinceID = res.data.Doctor_Infor.provinceID;
                specialtyID = res.data.Doctor_Infor.specialtyID;
                clinicID = res.data.Doctor_Infor.clinicID;

                selectedPayment = listPayment.find(item =>{
                    return item && item.value === paymentID
                })
                selectedPrice = listPrice.find(item =>{
                    return item && item.value === priceID
                })
                selectedProvince = listProvince.find(item =>{
                    return item && item.value === provinceID
                })
                selectedSpecialty = listSpecialty.find(item =>{
                    return item && item.value === specialtyID
                })
                selectedClinic = listClinic.find(item =>{
                    return item && item.value === clinicID
                })

            }
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true,
                addressClinic: addressClinic,
                nameClinic: nameClinic,
                note: note,
                selectedPrice: selectedPrice,
                selectedPayment: selectedPayment,
                selectedProvince: selectedProvince,
                selectedSpecialty: selectedSpecialty,
                selectedClinic: selectedClinic,

            })
        }else{
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false,
                addressClinic: '',
                nameClinic: '',
                note: '',
                selectedPayment: '',
                selectedPrice: '',
                selectedProvince: '',
                selectedSpecialty: '',
                selectedClinic: '',

            })
        }
        // console.log('check response: ', res);
    }
    //copy state
    handleChangeSelecDoctorInfor = async (selectedOption, name) =>{
        let stateName = name.name;
        let stateCopy = {...this.state};
        stateCopy[stateName] = selectedOption;
        this.setState({
            ...stateCopy
        })
    }
    handleOnChangeText = (event, id) =>{
        let stateCopy = {...this.state};
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }
   
    render() {
        let {hasOldData} = this.state;
        return (
            <div className=' manage-doctor-container'>
                <div className='manage-doctor-title'> Tạo thêm thông tin bác sĩ</div>
                <div className='more-info'>
                    <div className='content-left form-group'>
                        <label>Chọn bác sĩ</label>
                        <Select
                            value = {this.state.selectedOption}
                            onChange = {this.handleChangeSelect}
                            options = {this.state.listDoctors}
                            placeholder = {'Chọn bác sĩ'}
                        ></Select>
                    </div>
                    <div className='content-right'>
                        <label>Thông tin giới thiệu: </label>
                        <textarea
                            className='form-control' rows='4'
                            onChange={(event) => this.handleOnChangeText(event, 'description')}
                            value={this.state.description}
                        ></textarea>
                    </div>
                    
                </div>
                <div className='more-infor-extra row'>
                        <div className='col-4 form-group'>
                            <label>Chọn giá</label>
                            <Select
                                value= {this.state.selectedPrice}
                                onChange={this.handleChangeSelecDoctorInfor}
                                options = {this.state.listPrice}
                                placeholder = {'Chọn giá'}
                                name="selectedPrice">
                            </Select>
                        </div>
                        <div className='col-4 form-group'>
                            <label>Chọn phương thức thanh toán</label>
                            <Select
                                value= {this.state.selectedPayment}
                                onChange={this.handleChangeSelecDoctorInfor}
                                options = {this.state.listPayment}
                                placeholder = {'Chọn phương thức thanh toán'}
                                name="selectedPayment">
                            </Select>
                        </div>
                        <div className='col-4 form-group'>
                            <label>Chọn tỉnh thành</label>
                            <Select
                                value= {this.state.selectedProvince}
                                onChange={this.handleChangeSelecDoctorInfor}
                                options = {this.state.listProvince}
                                placeholder = {'Chọn tỉnh thành'}
                                name="selectedProvince">
                            </Select>
                        </div>
                        <div className='col-4 form-group'>
                            <label>Tên phòng khám</label>
                            <input className='form-control'
                                onChange={(event) => this.handleOnChangeText(event, 'nameClinic')}
                                value={this.state.nameClinic}
                            ></input>
                        </div>
                        <div className='col-4 form-group'>
                            <label>Địa chỉ phòng khám</label>
                            <input className='form-control'
                                onChange={(event) => this.handleOnChangeText(event, 'addressClinic')}
                                value={this.state.addressClinic}
                            ></input>
                        </div>
                        <div className='col-4 form-group'>
                            <label>Ghi chú</label>
                            <input className='form-control'
                                onChange={(event) => this.handleOnChangeText(event, 'note')}
                                value={this.state.note}
                            ></input>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-4 form-group'>
                            <label>Chọn chuyên khoa</label>
                            <Select
                                value = {this.state.selectedSpecialty}
                                options = {this.state.listSpecialty}
                                placeholder = {"Chọn chuyên khoa"}
                                onChange = {this.handleChangeSelecDoctorInfor}
                                name = "selectedSpecialty"
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label>Chọn phòng khám</label>
                            <Select
                                value = {this.state.selectedClinic}
                                options = {this.state.listClinic}
                                placeholder = {"Chọn phòng khám"}
                                onChange = {this.handleChangeSelecDoctorInfor}
                                name = "selectedClinic"
                            />
                        </div>
                    </div>
                <div className='manage-doctor-editor'>
                    <MdEditor style={{height: '300px'}} 
                        renderHTML={text => mdParser.render(text)}
                        onChange = {this.handleEditorChange}
                        value = {this.state.contentMarkdown}>
                    </MdEditor>
                </div>
                <button
                    onClick={() => this.handleSaveContentMarkdown()}
                    className={hasOldData === true ? 'save-content-doctor' : 'create-content-doctor'}>
                    {hasOldData === true ? 
                        <span>Lưu thông tin</span> : <span>Tạo thông tin</span>
                    }
                </button>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
       allDoctors: state.admin.allDoctors,
       allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
        getAllRequiredDoctorInfor: () => dispatch(actions.getAllRequiredDoctorInfor()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
