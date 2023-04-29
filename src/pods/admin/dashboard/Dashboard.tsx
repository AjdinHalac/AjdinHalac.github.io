import React, { useState, useEffect } from 'react';
import {
    CCard,
    CCardBody,
    CRow,
    CCol,
    CCardHeader,
    CSelect,
    CInput,
    CLabel,
    CFormGroup,
    CContainer,
} from '@coreui/react';

import ApiCalls from './api/ApiCalls';
import { IPaginator } from '../../system/interfaces';
import { createQueryString } from '../../../utils/helpers';
import { IUserMetrics } from './interfaces';

const Dashboard = () => {
    const date = new Date();
    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - 7);

    const [userMetrics, setUserMetrics] = useState<IUserMetrics[]>([]);
    const [paginator] = useState<Partial<IPaginator>>({
        perPage: 5000,
        groupBy: 'day',
        fromDate: fromDate.toISOString(),
        toDate: date.toISOString(),
    });
    const getMetrics = async () => {
        const userResponse = await ApiCalls.getUserMetrics(createQueryString({ ...paginator }));
        setUserMetrics(userResponse.data.results || []);
    };

    useEffect(() => {
        getMetrics();
        // eslint-disable-next-line
    }, []);

    return (
        <CContainer>
            <CRow>
                <CCol xs={4}>
                    <CFormGroup>
                        <CLabel htmlFor="fromDate">From Date</CLabel>
                        <CInput
                            id="fromDate"
                            type="date"
                            required
                            value={paginator?.fromDate?.substring(0, 10)}
                            onChange={(e) => {
                                paginator.fromDate = new Date(e.currentTarget.value).toISOString();
                                getMetrics();
                            }}
                        />
                    </CFormGroup>
                </CCol>
                <CCol xs={4}>
                    <CFormGroup>
                        <CLabel htmlFor="toDate">To Date</CLabel>
                        <CInput
                            id="toDate"
                            type="date"
                            required
                            value={paginator?.toDate?.substring(0, 10)}
                            onChange={(e) => {
                                paginator.toDate = new Date(e.currentTarget.value).toISOString();
                                getMetrics();
                            }}
                        />
                    </CFormGroup>
                </CCol>

                <CCol xs={4}>
                    <CFormGroup>
                        <CLabel htmlFor="groupBy">Group By</CLabel>
                        <CSelect
                            id="groupBy"
                            onChange={(e) => {
                                paginator.groupBy = e.currentTarget.value;
                                getMetrics();
                            }}
                            aria-label="Default select example"
                        >
                            <option value="day">Day</option>
                            <option value="month">Month</option>
                            <option value="year">Year</option>
                        </CSelect>
                    </CFormGroup>
                </CCol>
            </CRow>

            <CRow>
                <CCol xxl={6} xs={12}>
                    <CCard>
                        <CCardHeader>Users</CCardHeader>
                        <CCardBody></CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </CContainer>
    );
};

export default Dashboard;
