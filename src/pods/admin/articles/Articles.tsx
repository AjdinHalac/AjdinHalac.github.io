import React, { useState, useEffect } from 'react';
import {
    CBadge,
    CButton,
    CInput,
    CFormGroup,
    CLabel,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CContainer,
    CDataTable,
    CRow,
    CDropdown,
    CDropdownToggle,
    CDropdownMenu,
    CDropdownItem,
} from '@coreui/react';
import { useHistory, useLocation } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';

import ApiCalls from './api/ApiCalls';
import { IArticle } from './interfaces';
import { IPaginator } from '../../system/interfaces';
import { createQueryString, parseError, truncate } from '../../../utils/helpers';
import NotificationsProvider from '../../../utils/notifications-provider';

const Articles = () => {
    const history = useHistory();
    const [alert, setAlert] = useState(null);
    const params = new URLSearchParams(useLocation().search);
    const [perPage, setPerPage] = useState<number>(params.get('perPage') ? Number(params.get('perPage')) : 10);
    const [page, setPage] = useState<number>(params.get('page') ? Number(params.get('page')) : 1);
    const [orderBy, setOrderBy] = useState<string>(params.get('orderBy') ? String(params.get('orderBy')) : 'id');
    const [orderDir, setOrderDir] = useState<string>(params.get('orderDir') ? String(params.get('orderDir')) : 'ASC');
    const [filter, setFilter] = useState<string>(params.get('filter') ? String(params.get('filter')) : '');
    const [paginator, setPaginator] = useState<Partial<IPaginator>>({
        perPage: perPage,
        page: page,
        orderBy: orderBy,
        orderDir: orderDir,
        filter: filter,
    });
    const [articles, setArticles] = useState<IArticle[]>([]);

    const setFilterValueAndResetPage = (value: string) => {
        setFilter(value);
        setPage(1);
    };

    const getArticles = async () => {
        try {
            const query = createQueryString({
                perPage: perPage,
                page: page,
                orderBy: orderBy,
                orderDir: orderDir,
                filter: filter,
            });
            const response = await ApiCalls.getArticles(query);
            setArticles(response.data.results || []);
            setPaginator(response.data.paginator);
            history.push(`/admin/articles?${query}`);
        } catch (err) {
            const errorMessage = parseError(err, 'Error occurred while getting articles.');
            NotificationsProvider.error(errorMessage);
        }
    };

    const pageChange = (newPage: any) => {
        setPage(newPage);
    };

    const removeArticle = async (slug: string) => {
        try {
            await ApiCalls.removeArticle(slug);
            await getArticles();
            NotificationsProvider.success('Article removed.');
        } catch (err) {
            const errorMessage = parseError(err, 'Error occurred while removing article.');
            NotificationsProvider.error(errorMessage);
        }
    };

    const showDeleteArticleAlert = (slug: string) => {
        const getAlert = () => (
            <SweetAlert
                warning
                showCancel
                confirmBtnText="Yes, delete article!"
                confirmBtnBsStyle="danger"
                cancelBtnBsStyle="default"
                title="Are you sure?"
                onConfirm={async () => {
                    await removeArticle(slug);
                    hideAlert();
                }}
                onCancel={() => hideAlert()}
            />
        );

        // @ts-ignore
        setAlert(getAlert());
    };

    const publishArticle = async (slug: string) => {
        try {
            await ApiCalls.publishArticle(slug);
            await getArticles();
            NotificationsProvider.success('Article published.');
        } catch (err) {
            const errorMessage = parseError(err, 'Error occurred while publishing article.');
            NotificationsProvider.error(errorMessage);
        }
    };

    const hideAlert = () => {
        setAlert(null);
    };

    const getBadge = (price: number | null | string | boolean) => {
        if (price) {
            return 'success';
        }
        return 'danger';
    };

    useEffect(() => {
        getArticles();
        // eslint-disable-next-line
    }, [perPage, page, orderBy, orderDir, filter]);

    return (
        <CContainer>
            <CRow>
                <CCol xl={12}>
                    <CCard>
                        <CCardHeader>Articles</CCardHeader>
                        <CCardBody>
                            <CFormGroup>
                                <CLabel htmlFor="search">Search</CLabel>
                                <CInput
                                    id="search"
                                    placeholder="Search by title"
                                    required
                                    value={filter}
                                    onChange={(e) => setFilterValueAndResetPage(e.currentTarget.value)}
                                    max={100}
                                    min={1}
                                />
                            </CFormGroup>
                            <CRow>
                                <CDropdown id="perPage">
                                    <CDropdownToggle caret>Per page</CDropdownToggle>
                                    <CDropdownMenu>
                                        <CDropdownItem onClick={() => setPerPage(10)}>10</CDropdownItem>
                                        <CDropdownItem onClick={() => setPerPage(25)}>25</CDropdownItem>
                                        <CDropdownItem onClick={() => setPerPage(50)}>50</CDropdownItem>
                                        <CDropdownItem onClick={() => setPerPage(100)}>100</CDropdownItem>
                                    </CDropdownMenu>
                                </CDropdown>
                                <CDropdown id="orderBy">
                                    <CDropdownToggle caret>Order by</CDropdownToggle>
                                    <CDropdownMenu>
                                        <CDropdownItem onClick={() => setOrderBy('id')}>ID</CDropdownItem>
                                        <CDropdownItem onClick={() => setOrderBy('published_at')}>
                                            Published At
                                        </CDropdownItem>
                                    </CDropdownMenu>
                                </CDropdown>
                                <CDropdown id="orderDir">
                                    <CDropdownToggle caret>Order dir</CDropdownToggle>
                                    <CDropdownMenu>
                                        <CDropdownItem onClick={() => setOrderDir('ASC')}>ASC</CDropdownItem>
                                        <CDropdownItem onClick={() => setOrderDir('DESC')}>DESC</CDropdownItem>
                                    </CDropdownMenu>
                                </CDropdown>
                            </CRow>
                            <CDataTable
                                items={articles}
                                fields={[
                                    {
                                        key: 'id',
                                        _classes: 'font-weight-bold',
                                        label: 'ID',
                                    },
                                    {
                                        key: 'categoryID',
                                        _classes: 'font-weight-bold',
                                        label: 'Category ID',
                                    },
                                    'publishedAt',
                                    'title',
                                    'slug',
                                    'content',
                                    'image',
                                    {
                                        key: 'actions',
                                        _classes: 'font-weight-bold',
                                        label: 'Actions',
                                    },
                                ]}
                                itemsPerPage={paginator?.perPage}
                                clickableRows
                                hover
                                onRowClick={(item: IArticle) => history.push(`/admin/articles/${item.slug}`)}
                                scopedSlots={{
                                    publishedAt: (item: IArticle) => (
                                        <td>
                                            <CBadge
                                                color={getBadge(!!item.publishedAt)}
                                            >{`${item.publishedAt}`}</CBadge>
                                        </td>
                                    ),
                                    content: (item: IArticle) => <td>{truncate(item.content, 200, '...')}</td>,
                                    image: (item: IArticle) => (
                                        <td>
                                            <img src={item.image} alt="article" width={200} />
                                        </td>
                                    ),
                                    actions: (item: IArticle) => (
                                        <td style={{ display: 'flex' }}>
                                            {item.publishedAt ? null : (
                                                <CButton
                                                    color="success"
                                                    onClick={(e: any) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        publishArticle(item?.slug);
                                                    }}
                                                >
                                                    Publish
                                                </CButton>
                                            )}
                                            <CButton
                                                style={{ marginLeft: 10 }}
                                                color="danger"
                                                onClick={(e: any) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    showDeleteArticleAlert(item?.slug);
                                                }}
                                            >
                                                Remove
                                            </CButton>
                                        </td>
                                    ),
                                }}
                            />
                            <CButton
                                style={{ float: 'left', margin: 5 }}
                                color="primary"
                                onClick={() => history.push('/admin/create-article')}
                            >
                                Create Article
                            </CButton>
                            <CButton
                                style={{ float: 'right', margin: 5 }}
                                disabled={!!(paginator && paginator.totalPages && page === paginator.totalPages)}
                                color="secondary"
                                onClick={() => pageChange(page + 1)}
                            >
                                Next
                            </CButton>
                            <CButton
                                style={{ float: 'right', margin: 5 }}
                                disabled={page === 1}
                                color="secondary"
                                onClick={() => pageChange(page - 1)}
                            >
                                Previous
                            </CButton>
                        </CCardBody>
                        {alert}
                    </CCard>
                </CCol>
            </CRow>
        </CContainer>
    );
};

export default Articles;
