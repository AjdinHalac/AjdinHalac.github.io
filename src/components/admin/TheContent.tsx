import React from 'react';
import { Route, Switch } from 'react-router-dom';

const Dashboard = React.lazy(() => import('../../pods/admin/dashboard/Dashboard'));
const Users = React.lazy(() => import('../../pods/admin/users/Users'));
const User = React.lazy(() => import('../../pods/admin/users/User'));
const UserRoles = React.lazy(() => import('../../pods/admin/users/UserRoles'));
const Articles = React.lazy(() => import('../../pods/admin/articles/Articles'));
const Article = React.lazy(() => import('../../pods/admin/articles/Article'));
const CreateArticle = React.lazy(() => import('../../pods/admin/articles/CreateArticle'));
const Tags = React.lazy(() => import('../../pods/admin/articles/Tags'));
const Tag = React.lazy(() => import('../../pods/admin/articles/Tag'));
const CreateTag = React.lazy(() => import('../../pods/admin/articles/CreateTag'));
const TosList = React.lazy(() => import('../../pods/admin/tos/TosList'));
const Tos = React.lazy(() => import('../../pods/admin/tos/Tos'));
const CreateTos = React.lazy(() => import('../../pods/admin/tos/CreateTos'));

const TheContent = () => {
    return (
        <Switch>
            <Route exact path="/admin/dashboard" render={(props: any) => <Dashboard {...props} />} />
            <Route exact path="/admin/users" render={(props: any) => <Users {...props} />} />
            <Route exact path="/admin/users/:id" render={(props: any) => <User {...props} />} />
            <Route exact path="/admin/users/:id/roles" render={(props: any) => <UserRoles {...props} />} />
            <Route exact path="/admin/articles" render={(props: any) => <Articles {...props} />} />
            <Route exact path="/admin/articles/:id" render={(props: any) => <Article {...props} />} />
            <Route exact path="/admin/create-article" render={(props: any) => <CreateArticle {...props} />} />
            <Route exact path="/admin/tags" render={(props: any) => <Tags {...props} />} />
            <Route exact path="/admin/tags/:id" render={(props: any) => <Tag {...props} />} />
            <Route exact path="/admin/create-tag" render={(props: any) => <CreateTag {...props} />} />
            <Route exact path="/admin/tos" render={(props: any) => <TosList {...props} />} />
            <Route exact path="/admin/tos/:id" render={(props: any) => <Tos {...props} />} />
            <Route exact path="/admin/create-tos" render={(props: any) => <CreateTos {...props} />} />
        </Switch>
    );
};

export default React.memo(TheContent);
