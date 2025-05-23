// import React, { useState } from "react";
// import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
// import swal from "sweetalert";

// import {
//   Center,
//   Heading,
//   HStack,
//   InputGroup,
//   InputLeftAddon,
//   useDisclosure,
//   Image,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalBody,
//   ModalCloseButton,
//   Button,
//   Box,
//   Input,
//   Checkbox,
//   InputRightElement,
//   Text
// } from "@chakra-ui/react";

// const Signup = () => {
//   const init = {
//     first_name: "",
//     last_name: "",
//     ph_no: "",
//     email: "",
//     password: ""
//   };

//   const [userData, setUserData] = useState(init);
//   const [first, setFirst] = useState();
//   const [last, setLast] = useState();
//   const [ph, setPh] = useState();
//   const [mail, setMail] = useState();
//   const [pass, setPass] = useState();
//   const [loading, setLoading] = useState(false);
//   const [show, setShow] = useState(false);
//   const [Auth, setAuth] = useState();
//   const [exist, setExist] = useState(false);
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   var flag = false;

//   const Required = (props) => {
//     return (
//       <Box
//         fontSize={"14px"}
//         m="3px 0px 3px 0px"
//         color={"#ff1f1f"}
//         fontWeight="500"
//         letterSpacing={"-0.4px"}
//       >
//         {props.info}
//       </Box>
//     );
//   };

//   const handleChange = (e) => {
//     setExist(false);
//     const { name, value } = e.target;
//     setUserData({ ...userData, [name]: value });

//     switch (name) {
//       case "first_name":
//         setFirst(
//           value === "" ? <Required info="This is a required feild" /> : ""
//         );
//         break;

//       case "last_name":
//         setLast(
//           value === "" ? <Required info="This is a required feild" /> : ""
//         );
//         break;

//       case "ph_no":
//         setPh(
//           value === "" ? (
//             <Required info="This is a required feild" />
//           ) : (
//             <Required info="Please enter a valid mobile number (eg. 9987XXXXXX)" />
//           )
//         );
//         break;

//       case "email":
//         setMail(
//           value === "" ? (
//             <Required info="This is a required feild" />
//           ) : (
//             <Required info="Please enter a valid email address e.g. johndoe@domain.com." />
//           )
//         );
//         break;

//       case "password":
//         setPass(
//           value === "" ? (
//             <Required info="This is a required feild" />
//           ) : (
//             <Required info="Password should be more than 6 characters." />
//           )
//         );
//         break;

//       default:
//         break;
//     }
//   };



// const getData = async () => {
//   setLoading(true);

//   const payload = {
//     fname: userData.first_name,
//     lname: userData.last_name,
//     number: userData.ph_no,
//     email: userData.email,
//     password: userData.password,
//     password_confirmation: userData.password
//   };

//   console.log("Sending payload:", payload);

//   try {
//     const res = await fetch("https://lens.princy.shop/api/usersignup", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(payload)
//     });

//     const result = await res.json();
//     console.log("Full API response:", result);

//     const status = result?.res?.toLowerCase();
//     const msg = result?.message || "Unknown response from server";

//     if (status === "success" && result.data) {
//       setAuth(true);
//       setExist(false);

//       localStorage.setItem("user", JSON.stringify({
//         fname: result.data.fname,
//         lname: result.data.lname,
//         number: result.data.number,
//         email: result.data.email,
//         token: result.data.token
//       }));

//       swal("Success!", "User registered successfully!", "success");
//     } else {
//       setAuth(false);
//       setExist(true);

//       swal("Error!", msg, "error");
//     }
//   } catch (error) {
//     console.error("Signup error:", error);
//     setAuth(false);
//     swal("Error", "Something went wrong. Please try again.", "error");
//   } finally {
//     setLoading(false);
//     onClose();
//   }
// };



//   const handleRegister = () => {
//     getData(userData);
//   };

//   return (
//     <div>
//       <Center onClick={onOpen} fontWeight={"400"} fontSize="15px" w="60px">
//         Sign Up
//       </Center>

//       <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
//         <ModalOverlay />
//         <ModalContent w="lg" pt="5" rounded="3xl">
//           <ModalCloseButton />

//           <ModalBody p={"0px 0px "}>
//             <Box m={"5px 45px 20px 45px"}>
//               <Heading
//                 fontFamily={" Times, serif"}
//                 fontWeight="100"
//                 fontSize={"26px"}
//                 mb="20px"
//                 color={"#333368"}
//               >
//                 Create an Account
//               </Heading>

//               <Input
//                 type="text"
//                 fontSize="16px"
//                 onChange={handleChange}
//                 focusBorderColor="rgb(206, 206, 223)"
//                 name="first_name"
//                 placeholder="First Name*"
//                 h={"45px"}
//                 borderColor={"rgb(206, 206, 223)"}
//                 m={"8px 0px 15px 0px"}
//                 rounded="2xl"
//               />

//               <Text mt="-2%" ml="2%">
//                 {first}
//               </Text>

//               <Input
//                 fontSize="16px"
//                 onChange={handleChange}
//                 name="last_name"
//                 type="text"
//                 placeholder="Last Name"
//                 h={"45px"}
//                 focusBorderColor="rgb(206, 206, 223)"
//                 borderColor={"rgb(206, 206, 223)"}
//                 m={"8px 0px 25px 0px"}
//                 rounded="2xl"
//               />
//               <Text mt="-2%" ml="2%">
//                 {last}
//               </Text>

//               <InputGroup
//                 w="100%"
//                 h="50px"
//                 fontSize="18px"
//                 borderRadius="xl"
//                 mb="14px"
//               >
//                 <InputLeftAddon
//                   children="+91"
//                   h="45px"
//                   fontSize="18px"
//                   rounded="2xl"
//                   bg="whiteAlpha.900"
//                 />

//                 <Input
//                   onChange={handleChange}
//                   type="number"
//                   name="ph_no"
//                   placeholder=" Mobile*"
//                   w="100%"
//                   h="45px"
//                   fontSize="16px"
//                   focusBorderColor="rgb(206, 206, 223)"
//                   borderColor={"rgb(206, 206, 223)"}
//                   rounded="2xl"
//                 />
//               </InputGroup>
//               <Text mt="-2%" ml="2%">
//                 {userData.ph_no.length === 10 ? "" : ph}
//               </Text>

//               <Input
//                 onChange={handleChange}
//                 fontSize="16px"
//                 name="email"
//                 placeholder="Email*"
//                 h={"45px"}
//                 focusBorderColor="rgb(206, 206, 223)"
//                 borderColor={"rgb(206, 206, 223)"}
//                 m={"8px 0px 18px 0px"}
//                 rounded="2xl"
//               />
//               <Text mt="-2%" ml="2%">
//                 {userData.email.includes("@") && userData.email.includes(".com")
//                   ? ""
//                   : mail}
//               </Text>

//               <InputGroup mb="15px">
//                 <Input
//                   onChange={handleChange}
//                   fontSize="16px"
//                   type={show ? "text" : "password"}
//                   name="password"
//                   placeholder="Password*"
//                   h={"45px"}
//                   focusBorderColor="rgb(206, 206, 223)"
//                   borderColor={"rgb(206, 206, 223)"}
//                   m={"8px 0px 8px 0px"}
//                   rounded="2xl"
//                 />

//                 <InputRightElement width="6.5rem" size="lg">
//                   <Button
//                     size="md"
//                     borderRadius="3xl"
//                     mt="20%"
//                     onClick={() => setShow(!show)}
//                     bg="white"
//                   >
//                     {show ? <ViewOffIcon /> : <ViewIcon />}
//                   </Button>
//                 </InputRightElement>
//               </InputGroup>
//               {userData.password.length >= 6 ? "" : pass}

//               <HStack>
//                 <Box
//                   textDecoration={"underline"}
//                   fontFamily={" sans-serif"}
//                   color={"#333368"}
//                   fontSize="14px"
//                 >
//                   Got a Referral code?
//                 </Box>

//                 <Box fontFamily={" sans-serif"} color={"#333368"}>
//                   (Optional)
//                 </Box>
//               </HStack>

//               <HStack>
//                 <Checkbox
//                   mb={"20px"}
//                   mt="20px"
//                   size="sm"
//                   fontFamily={" sans-serif"}
//                 >
//                   Get Update on whatsapp
//                 </Checkbox>
//                 <Image
//                   src="https://static.lenskart.com/media/desktop/img/25-July-19/whatsapp.png"
//                   w={"22px"}
//                   h="22px"
//                 />
//               </HStack>
//               {exist === true ? (
//                 <Required info="Email Id already exists" />
//               ) : (
//                 ""
//               )}

//               <HStack spacing={"3px"} mb="10px">
//                 <Box
//                   fontSize={"14px"}
//                   fontFamily={" sans-serif"}
//                   fontWeight="100"
//                   letterSpacing={"-0.4px"}
//                 >
//                   By creating this account, you agree to our
//                 </Box>
//                 <Box fontSize={"15px"} textDecoration="underline">
//                   Privacy Policy
//                 </Box>
//               </HStack>

//               {userData.email.includes("@") &&
//               userData.email.includes(".com") &&
//               userData.first_name.length >= 1 &&
//               userData.last_name.length >= 1 &&
//               userData.password.length >= 6 &&
//               userData.ph_no.length === 10 ? (
//                 <Button
//                   isLoading={loading}
//                   onClick={handleRegister}
//                   bgColor={"#11daac"}
//                   width="100%"
//                   borderRadius={"35px/35px"}
//                   h="50px"
//                   _hover={{ backgroundColor: "#11daac" }}
//                   fontFamily={" sans-serif"}
//                   fontWeight="300"
//                   fontSize="18px"
//                 >
//                   Create an Account
//                 </Button>
//               ) : (
//                 <Button
//                   bgColor={"#cccccc"}
//                   width="100%"
//                   borderRadius={"35px/35px"}
//                   h="50px"
//                   fontFamily={" sans-serif"}
//                   fontWeight="300"
//                   fontSize="18px"
//                 >
//                   Create an Account
//                 </Button>
//               )}

//               <Center mt={"14px"} fontSize="15px" gap="2">
//                 Have an account?{" "}
//                 <Center fontWeight={"500"} textDecoration="underline">
//                   Sign In
//                 </Center>
//               </Center>
//             </Box>
//           </ModalBody>
//         </ModalContent>
//       </Modal>
//     </div>
//   );
// };

// export default Signup;
import React, { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import swal from "sweetalert";
import {
  Center,
  Heading,
  HStack,
  InputGroup,
  InputLeftAddon,
  useDisclosure,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  Input,
  Checkbox,
  InputRightElement,
  Text
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const init = {
    first_name: "",
    last_name: "",
    ph_no: "",
    email: "",
    password: ""
  };
   const [successMsg, setSuccessMsg] = useState("");
  const [userData, setUserData] = useState(init);
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [exist, setExist] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const validate = () => {
    const errs = {};
    if (!userData.first_name) errs.first_name = "First name is required.";
    if (!userData.last_name) errs.last_name = "Last name is required.";
    if (!userData.email.includes("@") || !userData.email.includes("."))
      errs.email = "Enter a valid email address.";
    if (userData.ph_no.length !== 10)
      errs.ph_no = "Phone number must be 10 digits.";
    if (userData.password.length < 6)
      errs.password = "Password must be at least 6 characters.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    setExist(false);
     setSuccessMsg("");
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    setErrors({ ...errors, [name]: null }); 
  };

  const getData = async () => {
    if (!validate()) return;

    setLoading(true);

    const payload = {
      fname: userData.first_name,
      lname: userData.last_name,
      number: userData.ph_no,
      email: userData.email,
      password: userData.password,
      password_confirmation: userData.password
    };

    try {
      const res = await fetch("https://lens.princy.shop/api/usersignup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = await res.json();

      if (result.status === true && result.data) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            fname: result.data.fname,
            lname: result.data.lname,
            number: result.data.number,
            email: result.data.email,
            token: result.data.token
          })
        );

        swal("Success!", result.message || "register successful!", "success")
        setSuccessMsg("register successful!");
        onClose();
        // navigate("/"); // Send them home!
      } else {
        setExist(true);
        swal("Error!", result.message || "Signup failed.", "error");
      }
    } catch (error) {
      console.error("Signup error:", error);
      swal("Error", "Something went wrong. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Center onClick={onOpen} fontWeight="400" fontSize="15px" w="60px">
        Sign Up
      </Center>

      <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
        <ModalOverlay />
        <ModalContent pt="5" rounded="3xl">
          <ModalCloseButton />

          <ModalBody p="0">
            <Box m="5px 45px 20px 45px">
              <Heading
                fontFamily="Times, serif"
                fontWeight="100"
                fontSize="26px"
                mb="20px"
                color="#333368"
              >
                Create an Account
              </Heading>

              <Input
                name="first_name"
                placeholder="First Name*"
                h="45px"
                fontSize="16px"
                onChange={handleChange}
                rounded="2xl"
                borderColor="rgb(206, 206, 223)"
              />
              {errors.first_name && <Text color="red.500">{errors.first_name}</Text>}

              <Input
                name="last_name"
                placeholder="Last Name*"
                h="45px"
                fontSize="16px"
                mt={2}
                onChange={handleChange}
                rounded="2xl"
                borderColor="rgb(206, 206, 223)"
              />
              {errors.last_name && <Text color="red.500">{errors.last_name}</Text>}

              <InputGroup mt={2}>
                <InputLeftAddon children="+91" h="45px" fontSize="16px" rounded="2xl" />
                <Input
                  name="ph_no"
                  type="number"
                  placeholder="Mobile*"
                  h="45px"
                  fontSize="16px"
                  onChange={handleChange}
                  rounded="2xl"
                  borderColor="rgb(206, 206, 223)"
                />
              </InputGroup>
              {errors.ph_no && <Text color="red.500">{errors.ph_no}</Text>}

              <Input
                name="email"
                placeholder="Email*"
                h="45px"
                fontSize="16px"
                mt={2}
                onChange={handleChange}
                rounded="2xl"
                borderColor="rgb(206, 206, 223)"
              />
              {errors.email && <Text color="red.500">{errors.email}</Text>}

              <InputGroup mt={2}>
                <Input
                  name="password"
                  type={show ? "text" : "password"}
                  placeholder="Password*"
                  h="45px"
                  fontSize="16px"
                  onChange={handleChange}
                  rounded="2xl"
                  borderColor="rgb(206, 206, 223)"
                />
                <InputRightElement width="6.5rem">
                  <Button
                    size="md"
                    borderRadius="3xl"
                    mt="10%"
                    onClick={() => setShow(!show)}
                    bg="white"
                  >
                    {show ? <ViewOffIcon /> : <ViewIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {errors.password && <Text color="red.500">{errors.password}</Text>}

              <HStack mt={4}>
                <Checkbox size="sm">Get Update on WhatsApp</Checkbox>
                <Image
                  src="https://static.lenskart.com/media/desktop/img/25-July-19/whatsapp.png"
                  w="22px"
                  h="22px"
                />
              </HStack>

              {exist && <Text color="red.500">Email already exists</Text>}

              <HStack spacing="3px" mb="10px" mt={3}>
                <Box fontSize="14px">By creating this account, you agree to our</Box>
                <Box fontSize="15px" textDecoration="underline">
                  Privacy Policy
                </Box>
              </HStack>

              <Button
                isLoading={loading}
                onClick={getData}
                bgColor="#11daac"
                width="100%"
                borderRadius="35px"
                h="50px"
                fontSize="18px"
                mt={3}
              >
                Create an Account
              </Button>

              <Center mt="14px" fontSize="15px" gap="2">
                Have an account?{" "}
                <Center fontWeight="500" textDecoration="underline">
                  Sign In
                </Center>
              </Center>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Signup;
