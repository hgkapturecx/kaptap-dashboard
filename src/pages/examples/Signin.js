import React, { useState } from "react";
import {
  Col,
  Row,
  Form,
  Card,
  Button,
  Container,
} from "@themesberg/react-bootstrap";
import { Link } from "react-router-dom";
import {  useHistory } from "react-router-dom";

// import { login } from "../../services/auth.services";
import BgImage from "../../assets/img/illustrations/signin.svg";
import { getAuthToken, storeProjectID, storeSecretToken, storeUserType } from "../../utils/genral.function";
import fetchController from "../../services/fetchControler";

export default () => {
  const history  = useHistory()

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [projectID, setprojectID] = useState("");

  const onSubmit = () => {
    if(!password || !email || !projectID){
      return
    }

    fetchController('/login' ,{
      password,
      email,
      projectID
    }).then(res=>{
      console.log("Login Successfully");
      if(res.success){
        storeSecretToken(res?.data?.secretToken)
        storeProjectID(res?.data?.projectID)
        storeUserType(res?.data?.userType)
        history.push('/')
      }else{
        alert("please try after sometime")
      }
    })
    .catch((err) => {
      alert(err);
      console.log("Login error:",err);
    });
  };

  const defaultProjectID = () => { 
    const projectID = getAuthToken("projectID")

    if(projectID){
      return {
        defaultValue:projectID,
        disabled:true
      }
    }else{
      return {}
    }
  }



  return (
    <main>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>

          <Row
            className="justify-content-center form-bg-image"
            style={{ backgroundImage: `url(${BgImage})` }}
          >
            <Col
              xs={12}
              className="d-flex align-items-center justify-content-center"
            >
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Sign in to our platform</h3>
                </div>
                <Form
                  className="mt-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit();
                  }}
                >
                  <Form.Group id="projectID" className="mb-2">
                    <Form.Label>Project ID</Form.Label>
                    <Form.Control
                      required
                      placeholder="Project Name"
                      value={projectID}
                      {...defaultProjectID()}
                      onChange={(e) => setprojectID(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group id="email" className="mb-2">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      required
                      placeholder="example@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group id="password" className="mb-2">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      required
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100 mt-4"
                  >
                    Sign in
                  </Button>
                </Form>

                <div className="d-flex justify-content-center align-items-center mt-4">
                  <span className="fw-normal">
                    Not registered?
                    <Card.Link
                      as={Link}
                      to={"/"}
                      className="fw-bold"
                    >
                      {` Create account `}
                    </Card.Link>
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};
