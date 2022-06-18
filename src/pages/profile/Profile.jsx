import React, { useEffect, useState } from "react";
import "./profile.scss";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import { getUserOrder } from "../../api/apiOrder";
import { changePassword } from "../../api/apiUser";

//components
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import Order from "../../components/order/Order";

const Profile = () => {
  const { currentUser } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [userOrders, setUserOrders] = useState([]);
  const [showChangePass, setShowChanePass] = useState(false);
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [errorPass, setErrorPass] = useState(false);
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    const apiOrder = async () => {
      try {
        setError(false);
        setLoading(true);
        const orders = await getUserOrder();
        setUserOrders(orders.userOrders);
        setLoading(false);
      } catch (error) {
        setError(true);
      }
    };
    apiOrder();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setErrorPass(false);
      const res = await changePassword(
        currentUser.userId,
        oldPassword,
        newPassword
      );
      alert(res.data.msg);
      setShowChanePass(false);
    } catch (error) {
      setErrorPass(true);
      setMsg(error.response.data.msg);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (error) return <div>Something went wrong...</div>;

  return (
    <>
      <Navbar />
      {loading ? (
        <div id="product-loading">
          <div className="loading-container">
            <div className="lds-roller">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      ) : (
        <div id="profile">
          <div className="container">
            <div className="wrapper">
              <div className="breadcrumb">
                <ul>
                  <li>
                    <Link to="/">UNIQLO Home Page</Link>
                  </li>

                  <li className="slash">/</li>
                  <li>Profile</li>
                </ul>
              </div>
              <div className="profile-title">
                <h2>MEMBERSHIP</h2>
              </div>
              <div className="content">
                <div className="profile">
                  <div className="profile-content">
                    <div className="heading">
                      <h3>PROFILE</h3>
                    </div>
                    <div className="item-info">
                      <h4>EMAIL ADDRESS</h4>
                      <p>{currentUser.email}</p>
                    </div>
                    <div className="item-info">
                      <h4>BIRTHDAY</h4>
                      <p>{currentUser.birthday.slice(0, 10)}</p>
                    </div>
                    <div className="item-info">
                      <h4>GENDER</h4>
                      <p className="gender">{currentUser.gender}</p>
                    </div>
                    <button
                      className="btn-change-pass"
                      onClick={() => setShowChanePass(!showChangePass)}
                    >
                      Change Password
                    </button>
                  </div>
                  <div
                    className={
                      showChangePass ? "change-pass active" : "change-pass"
                    }
                  >
                    <form>
                      {errorPass ? (
                        <p className="error">{msg}</p>
                      ) : (
                        <p>*Please enter your old Password</p>
                      )}
                      <label>OLD PASSWORD</label>
                      <div className="input">
                        <input
                          required
                          type="password"
                          className={errorPass ? "error-input" : ""}
                          onChange={(e) => setOldPassword(e.target.value)}
                        />
                      </div>
                      <label>NEW PASSWORD</label>
                      <div className="input">
                        <input
                          required
                          type="password"
                          className={errorPass ? "error-input" : ""}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                      </div>
                      <button className="btn-update" onClick={handleUpdate}>
                        UPDATE PASSWORD
                      </button>
                    </form>
                  </div>
                </div>

                <div className="order">
                  <div className="heading">
                    <h3>ORDER</h3>
                  </div>
                  <div className="list">
                    {userOrders.map((order) => (
                      <Order key={order._id} order={order} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Profile;
