import Header from "../../components/header/Header";
import UsersContent from "../../components/contents/UsersContent";

const Users = () => {
    return (
        <div style={{padding: '0.1% 20%'}}>
            <Header title={'Users'}/>
            <UsersContent />
        </div>
    );
};

export default Users;