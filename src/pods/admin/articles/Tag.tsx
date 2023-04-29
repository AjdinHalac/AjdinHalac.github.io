import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CDataTable,
    CForm,
    CInput,
    CLabel,
    CButton,
    CCardFooter,
    CContainer,
} from '@coreui/react';

import ApiCalls from './api/ApiCalls';
import { IArticle, ITag } from './interfaces';
import NotificationsProvider from '../../../utils/notifications-provider';
import { parseError } from '../../../utils/helpers';

const Tag = ({ match }: any) => {
    const history = useHistory();
    const [tag, setTag] = useState<Partial<ITag>>({ tag: '' });

    const getTag = async () => {
        try {
            const response = await ApiCalls.getTagById(match.params.id);
            setTag(response.data);
        } catch (err) {
            const errorMessage = parseError(err, 'Error occured while getting tag.');
            NotificationsProvider.error(errorMessage);
        }
    };

    const updateTag = async () => {
        try {
            await ApiCalls.updateTag(match.params.id, {
                payload: {
                    tag: tag?.tag,
                },
            });
            NotificationsProvider.success('Tag updated.');
        } catch (err) {
            const errorMessage = parseError(err, 'Error occured while updating tag.');
            NotificationsProvider.error(errorMessage);
        }
    };

    useEffect(() => {
        getTag();
        // eslint-disable-next-line
    }, []);

    return (
        <CContainer>
            <CRow>
                <CCol xs={12}>
                    <CCard>
                        <CCardHeader>Tag id: {match.params.id}</CCardHeader>
                        <CCardBody>
                            <CForm>
                                <CLabel>Tag</CLabel>
                                <CInput
                                    width={'50%'}
                                    value={tag.tag}
                                    onChange={(e: any) => setTag({ ...tag, tag: e.currentTarget.value })}
                                />
                            </CForm>
                            <CCol lg={12} md={12} xs={12}>
                                <CLabel style={{ margin: '20px 0' }}>Shipments</CLabel>
                            </CCol>
                            <CDataTable
                                items={tag.articles}
                                fields={['id', 'title']}
                                hover
                                striped
                                clickableRows
                                onRowClick={(item: IArticle) => history.push(`/admin/articles/${item?.slug}`)}
                            />
                        </CCardBody>
                        <CCardFooter>
                            <CButton disabled={!tag.tag} type="submit" size="lg" color="primary" onClick={updateTag}>
                                Save
                            </CButton>
                        </CCardFooter>
                    </CCard>
                </CCol>
            </CRow>
        </CContainer>
    );
};

export default Tag;
