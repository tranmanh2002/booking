import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './HomeHeader.scss'
import logo from '../../assets/Logo.PNG'
import { FormattedMessage } from 'react-intl';
import {withRouter} from 'react-router';

class HomeHeader extends Component {

    returnToHome = () =>{
        //click vào logo return lại trang chủ với withRouter
        if(this.props.history){
            this.props.history.push('/home')
        }
    }

    render() {
        return(
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <div className='fas fa-bars'></div>
                            <img src={logo} className='header-logo' onClick={() => this.returnToHome()}></img>
                        </div>
                        <div className='center-content'>
                            <div className='child-content'>
                                <div><b>Chuyên khoa</b></div>
                                <div className='sub-title'>Tìm bác sĩ theo chuyên khoa</div>
                            </div>
                            <div className='child-content'>
                                <div><b>Cơ sở y tế</b></div>
                                <div className='sub-title'>Chọn bệnh viện phòng khám</div>
                            </div>
                            <div className='child-content'>
                                <div><b>Bác sĩ</b></div>
                                <div className='sub-title'>Chọn bác sĩ giỏi</div>
                            </div>
                            <div className='child-content'>
                                <div><b>Gói khám</b></div>
                                <div className='sub-title'>Khám sức khỏe tổng quát</div>
                            </div>
                        </div>
                        <div className='right-content'>
                            <div className='support'><i className='fas fa-question-circle'></i>Hỗ trợ</div>
                        </div>
                    </div>
                </div>
                {this.props.isShowBanner === true &&
                    <div className='home-header-banner'>
                        <div className='content-up'>
                            <div className='title1'>NỀN TẢNG Y TẾ</div>
                            <div className='title2'>CHĂM SÓC SỨC KHỎE TOÀN DIỆN</div>
                            <div className='search'>
                                <i className='fas fa-search'></i>
                                <input type='text' placeholder='Tìm kiếm'></input>
                            </div>
                        </div>
                        <div className='content-down'>
                            <div className='options'>
                                <div className='option-child'>
                                    <div className='icon-child'><i className='far fa-hospital'></i></div>
                                    <div className='text-child'>Khám chuyên khoa</div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i className='fas fa-mobile-alt'></i></div>
                                    <div className='text-child'>Khám từ xa</div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i className='fas fa-procedures'></i></div>
                                    <div className='text-child'>Khám khám tổng quát</div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i className='fas fa-flask'></i></div>
                                    <div className='text-child'>Xét nghiệm y học</div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i className='fas fa-user-md'></i></div>
                                    <div className='text-child'>Sức khỏe tinh thần</div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i className="fas fa-briefcase-medical"></i></div>
                                    <div className='text-child'>Khám nha khoa</div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                
            </React.Fragment>

        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
