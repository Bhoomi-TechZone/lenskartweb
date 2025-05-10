
import React, { useContext, useState } from "react";
import { AuthContext } from "../../ContextApi/AuthContext";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import {
  Checkbox,
  useDisclosure,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Button,
  Image,
  Box,
  Heading,
  Input,
  HStack,
  Flex,
  Center,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";

const Login = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [passPhase, setPassPhase] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [incorrect, setIncorrect] = useState(false);
  const [validationMsg, setValidationMsg] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setisAuth, setAuthData } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setIncorrect(false);
    setError("");
    setSuccessMsg("");
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));

    if (name === "email" && (!value.includes("@") || !value.includes(".com"))) {
      setValidationMsg(
        <Box fontSize="14px" mt="5px" color="#ff1f1f" fontWeight="500">
          Please enter a valid Email.
        </Box>
      );
    } else {
      setValidationMsg(null);
    }
  };

  const getData = async () => {
    setLoading(true);

    try {
      const response = await fetch("https://lens.princy.shop/api/usersignin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const result = await response.json();

      if (result.status === true && result.data) {
        const { fname, lname, email, number, id } = result.data;
        const userDataToStore = { id, fname, lname, email, number };
        localStorage.setItem("user", JSON.stringify(userDataToStore));

        swal("Success!", result.message || "Login successful!", "success");
        setSuccessMsg("Login successful!");
        setisAuth(true);
        setAuthData(userDataToStore);
        onClose();
        setTimeout(() => {
          onClose();
          // navigate("/");
        }, 2000);
      } else {
        setIncorrect(true);
        swal("Error!", result.message || "Invalid credentials", "error");
        setError(result.message || "Login failed.");
      }
    } catch (error) {
      console.error("Login error:", error);
      swal("Error!", "Something went wrong. Please try again.", "error");
      setError("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  const handleEmailSubmit = () => {
    if (loginData.email.includes("@") && loginData.email.includes(".com")) {
      setPassPhase(true);
    } else {
      setValidationMsg(
        <Box fontSize="14px" mt="5px" color="#ff1f1f" fontWeight="500">
          Please enter a valid Email.
        </Box>
      );
    }
  };

  const handlePasswordSubmit = () => {
    if (loginData.password.length >= 6) {
      getData();
    } else {
      setValidationMsg(
        <Box fontSize="14px" mt="5px" color="#ff1f1f" fontWeight="500">
          Password must be at least 6 characters.
        </Box>
      );
    }
  };

  const resetLogin = () => {
    setPassPhase(false);
    setLoginData({ ...loginData, password: "" });
  };

  return (
    <div>
      <Center onClick={onOpen} fontWeight="400" fontSize="15px" w="80px">
        Sign In
      </Center>

      <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
        <ModalOverlay />
        <ModalContent rounded="3xl">
          <ModalCloseButton borderRadius="50%" bg="white" m="10px" />

          <ModalBody p="0">
            <Image
              src="https://static1.lenskart.com/media/desktop/img/DesignStudioIcons/DesktopLoginImage.svg"
              alt="Login"
              borderRadius="10px 10px 0 0"
            />

            <Box m="34px 45px 50px 45px">
              <Heading fontFamily="Times, serif" fontWeight="100" fontSize="28px" mb="24px" color="#333368">
                Sign In
              </Heading>

              {!passPhase ? (
                <>
                  <Input
                    name="email"
                    placeholder="Email"
                    h="50px"
                    fontSize="16px"
                    onChange={handleChange}
                    rounded="2xl"
                  />
                  {validationMsg}
                  <Button
                    mt="4"
                    onClick={handleEmailSubmit}
                    bgColor="#11daac"
                    width="100%"
                    borderRadius="35px"
                    h="50px"
                    fontSize="18px"
                  >
                    Continue
                  </Button>
                </>
              ) : (
                <>
                  <Box fontSize="17px" color="#66668e">
                    Enter password for
                  </Box>
                  <Flex justifyContent="space-between" mb="22px" color="#000042">
                    <Box fontSize="18px">{loginData.email}</Box>
                    <Box fontSize="14px" textDecoration="underline" onClick={resetLogin} cursor="pointer">
                      Edit
                    </Box>
                  </Flex>
                  <InputGroup>
                    <Input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter password"
                      h="50px"
                      fontSize="16px"
                      onChange={handleChange}
                      rounded="2xl"
                    />
                    <InputRightElement width="6.5rem">
                      <Button size="md" borderRadius="3xl" onClick={() => setShowPassword(!showPassword)} bg="white">
                        {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>

                  {incorrect && (
                    <Box fontSize="14px" color="#ff1f1f" fontWeight="500" ml="2" mt="2">
                      Wrong email or password
                    </Box>
                  )}

                  {validationMsg}

                  <Button
                    mt="4"
                    isLoading={loading}
                    onClick={handlePasswordSubmit}
                    bgColor="#11daac"
                    width="100%"
                    borderRadius="35px"
                    h="50px"
                    fontSize="18px"
                  >
                    Sign In
                  </Button>
                </>
              )}

              <Box textDecoration="underline" mt="15px" color="#000042" fontSize="15px">
                Forget Password
              </Box>

              <HStack mt="20px">
                <Checkbox size="sm">Get Updates on WhatsApp</Checkbox>
                <Image
                  src="https://static.lenskart.com/media/desktop/img/25-July-19/whatsapp.png"
                  w="22px"
                  h="22px"
                />
              </HStack>

              <HStack spacing="0px" mt="19px" gap="2">
                <Box fontSize="14px">New member?</Box>
                <Link fontSize="15px" fontWeight="500" textDecoration="underline">
                  Create an Account
                </Link>
              </HStack>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Login;

