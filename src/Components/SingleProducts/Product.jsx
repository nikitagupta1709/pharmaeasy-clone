import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Img,
  Select,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Share from "../../BannerImages/share.svg";
import Star from "../../BannerImages/star.png";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import TabCarousal from "../Home/TabCarousal";
import { ChevronDownIcon } from "@chakra-ui/icons";
import SingleProductBreadCumb from "./SingleProductBreadCumb";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addToCart, getCartTotal, remove, updateCart } from "../../Redux/Cart/action";

const Product = (props) => {
  const toast= useToast();
    const isAuth = localStorage.getItem('isAuth') || false;
    const navigate = useNavigate();
    const dispatch = useDispatch();
  const { data } = props;
  const ref = useRef();
  const [modalpos, setmodalpos] = useState(true);
  const [cartCount, setCartCount] = useState({});
  const [amt,setAmount] = useState(1);

  // for scrolling on button press code
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [scrollBehavior, setScrollBehavior] = React.useState("inside");
  const btnRef = React.useRef(null);
  const { totalAmount,cartItems } = useSelector((state) => state.cart);
 
function updateCart(amt,id){
    axios.post("https://pharmeasy-clone-x5wz.onrender.com/Cart",{
        ...data,
        amount:amt,
    }).then(res=>{
        dispatch(addToCart({...data,amount:amt}))
    })  
}
function update(id,amount){
    const body = {
        amount
    }
    fetch(`https://pharmeasy-clone-x5wz.onrender.com/Cart/${id}`,{
        method:"PATCH",
        body:JSON.stringify(body),
        headers:{"content-type": "application/json"}
    }).then((res)=>res.json()).then(res=>{
        dispatch(updateCart(id,amount))
    }).catch((err)=>console.log(err))
    
}
function removeItem(id){
        
    fetch(`https://pharmeasy-clone-x5wz.onrender.com/Cart/${id}`,{
    method:"DELETE",
   
    headers:{"content-type": "application/json"}
}).then((res)=>res.json()).then(dispatch(remove(id))).catch((err)=>console.log(err))


}
useEffect(()=>{
    dispatch(getCartTotal())

  },[cartItems])
  return (
    <Box fontFamily="'Open Sans',sans-serif">
      <Box m="50px 0 50px 15px">
        <SingleProductBreadCumb title={data.desc} />
      </Box>
      <Flex
        m="50px 15px"
        justifyContent="space-between"
        flexDirection={{ base: "column", md: "column", lg: "row" }}
      >
        <Box className="left" width={{ base: "100%", md: "100%", lg: "65%" }}>
          <Flex flexDirection={{ base: "column", md: "column", lg: "row" }}>
            <Box
              className="imagebox"
              mr="15px"
              m={{ base: "auto", md: "auto" }}
            >
              <Box
                className="image"
                p="15px 30px 15px 30px"
                border="1px solid #cecece"
                borderRadius="10px"
              >
                <Box position="realtive" width="250px" height="250px">
                  <Img
                    src={data.img1}
                    ref={ref}
                    alt={data.id}
                    width="100%"
                    height="100%"
                  />
                  <Box
                    bgColor="white"
                    position="absolute"
                    top="420px"
                    left="260px"
                    width="30px"
                    height="30px"
                    borderRadius="50%"
                    boxShadow="0 0 10px #cecece"
                    p="5px"
                  >
                    <Img src={Share} alt="Share" width="100%" height="100%" />
                  </Box>
                </Box>
              </Box>
              <Grid gridTemplateColumns="repeat(4,1fr)" gap={3} mt={3}>
                <GridItem
                  border="1px solid #cecece"
                  height="65px"
                  borderRadius="10px"
                  p="3px"
                >
                  <Img
                    src={data.img2}
                    alt=""
                    width="100%"
                    height="100%"
                    borderRadius="10px"
                    onClick={() => (ref.current.src = data.img2)}
                  ></Img>
                </GridItem>
                <GridItem
                  border="1px solid #cecece"
                  height="65px"
                  borderRadius="10px"
                  p="3px"
                >
                  <Img
                    src={data.img3}
                    alt=""
                    width="100%"
                    height="100%"
                    borderRadius="10px"
                    onClick={() => (ref.current.src = data.img3)}
                  ></Img>
                </GridItem>
                <GridItem
                  border="1px solid #cecece"
                  height="65px"
                  borderRadius="10px"
                  p="3px"
                >
                  <Img
                    src={data.img4}
                    alt=""
                    width="100%"
                    height="100%"
                    borderRadius="10px"
                    onClick={() => (ref.current.src = data.img4)}
                  ></Img>
                </GridItem>
                <GridItem
                  border="1px solid #cecece"
                  height="65px"
                  borderRadius="10px"
                  p="3px"
                >
                  <Img
                    src={data.img5}
                    alt=""
                    width="100%"
                    height="100%"
                    borderRadius="10px"
                    onClick={() => (ref.current.src = data.img5)}
                  ></Img>
                </GridItem>
                <GridItem
                  border="1px solid #cecece"
                  height="65px"
                  borderRadius="10px"
                  p="3px"
                >
                  <Img
                    src={data.img1}
                    alt=""
                    width="100%"
                    height="100%"
                    borderRadius="10px"
                    onClick={() => (ref.current.src = data.img1)}
                  ></Img>
                </GridItem>
              </Grid>
            </Box>
            <Box className="contentbox" p="0px 25px">
              <Heading fontSize="25px" color="#4F585E" mb={2}>
                {data.desc}
              </Heading>
              <Link>
                <Text color="#10847E" mb={2}>
                  Visit {data.company} store
                </Text>
              </Link>
              <Flex gap={5} mb={3}>
                <Box>
                  <Flex gap={1}>
                    <Box w="25px" h="23px">
                      <Img src={Star} w="100%" height="100%"></Img>
                    </Box>
                    <Box w="25px" h="23px">
                      <Img src={Star} w="100%" height="100%"></Img>
                    </Box>
                    <Box w="25px" h="23px">
                      <Img src={Star} w="100%" height="100%"></Img>
                    </Box>
                    <Box w="25px" h="23px">
                      <Img src={Star} w="100%" height="100%"></Img>
                    </Box>
                    <Box w="25px" h="23px">
                      <Img src={Star} w="100%" height="100%"></Img>
                    </Box>
                  </Flex>
                </Box>
                <Box>
                  <Text color="gray">( {data.ratings} ratings )</Text>
                </Box>
              </Flex>
              <Flex justifyContent="space-between">
                <Flex alignItems="flex-end">
                  <Text mr="10px" fontSize="20px" fontWeight="600">
                    {" "}
                    ₹{data.originalPrice}
                  </Text>
                  <Text>MRP </Text>
                  <Text mr="10px" fontSize="14px" as="del">
                    {" "}
                    ₹{data.newPrice}
                  </Text>
                  <Text
                    fontSize="12px"
                    bgColor="pink.300"
                    p="5px 20px"
                    color="white"
                    as="b"
                  >
                    {data.offer}% OFF
                  </Text>
                </Flex>
                <Box>
                  {!cartItems.find(e=>e.id===data.id) ? <VStack><Select
      value={amt}
      onChange={(e) => {
         setAmount(+e.target.value);
           
      }}
     
      fontWeight={"500"}
      placeholder="Qty"
    >
      <option value={1}>1</option>
      <option value={2}>2</option>
      <option value={3}>3</option>
      <option value={4}>4</option>
      <option value={5}>5</option>
      <option value={6}>6</option>
      <option value={7}>7</option>
      <option value={8}>8</option>
      <option value={9}>9</option>
      <option value={9}>10</option>
      
    </Select> <Button
                    ref={btnRef}
                    onClick={() => {
                    //   onOpen();
                    //   setmodalpos(true);
                    if(!isAuth){
                      toast({
                        title: 'User Not Logged in',
                        status: 'error',
                        duration: 3000,
                        isClosable: true,
                        position: "top",
                      });
                        navigate("/")
                        return;
                    }
                      
                      updateCart(amt,data.id);
                    
                    }}
                    size={{ base: "sm", md: "md", lg: "lg" }}
                    bgColor="#10847E"
                    color="white"
                    as="b"
                  >
                    {cartCount[data.id] ? (
                      <Text>
                        {`Qty ${cartCount[data.id]}`}
                        <ChevronDownIcon ml={2} />
                      </Text>
                    ) : (
                      "Add To Cart"
                    )}
                  </Button></VStack> : <Button colorScheme={"teal"} variant="outline" onClick={()=>{
                    navigate("/cart")
                  }}>View Cart</Button> }
                </Box>
                <Modal
                  onClose={onClose}
                  finalFocusRef={btnRef}
                  isOpen={isOpen}
                  scrollBehavior={scrollBehavior}
                  isCentered
                >
                  <ModalOverlay bg="transparent" />

                  <ModalContent
                    w="170px"
                    h="345px"
                    ml={modalpos ? "15%" : "85%"}
                  >
                    <ModalBody p="0" cursor="pointer">
                      <Text
                        p="6px 16px"
                        fontSize="20px"
                        fontWeight="600"
                        onClick={() => {
                          onClose();
                          setCartCount({});
                          dispatch(remove(data.id))
                        }}
                      >
                        Remove Item
                      </Text>
                      <Text
                        _hover={{ bgColor: "teal.100" }}
                        p="6px 16px"
                        fontSize="16px"
                        onClick={() => {
                          onClose();
                          setCartCount({ [data.id]: 1 });
                          update(data.id,1)
                          

                        }}
                      >
                        1
                      </Text>
                      <Text
                        _hover={{ bgColor: "teal.100" }}
                        p="6px 16px"
                        fontSize="16px"
                        onClick={() => {
                          onClose();
                          setCartCount({ [data.id]: 2 });
                          update(data.id,2)
                          
                        }}
                      >
                        2
                      </Text>
                      <Text
                        _hover={{ bgColor: "teal.100" }}
                        p="6px 16px"
                        fontSize="16px"
                        onClick={() => {
                          onClose();
                          setCartCount({ [data.id]: 3 });
                          update(data.id,3)
                         
                        }}
                      >
                        3
                      </Text>
                      <Text
                        _hover={{ bgColor: "teal.100" }}
                        p="6px 16px"
                        fontSize="16px"
                        onClick={() => {
                          onClose();
                          setCartCount({ [data.id]: 4 });
                          update(data.id,4)
                         
                        }}
                      >
                        4
                      </Text>
                      <Text
                        _hover={{ bgColor: "teal.100" }}
                        p="6px 16px"
                        fontSize="16px"
                        onClick={() => {
                          onClose();
                          setCartCount({ [data.id]: 5 });
                          update(data.id,5)
                          
                        }}
                      >
                        5
                      </Text>
                      <Text
                        _hover={{ bgColor: "teal.100" }}
                        p="6px 16px"
                        fontSize="16px"
                        onClick={() => {
                          onClose();
                          setCartCount({ [data.id]: 6 });
                          update(data.id,6)
                         
                        }}
                      >
                        6
                      </Text>
                      <Text
                        _hover={{ bgColor: "teal.100" }}
                        p="6px 16px"
                        fontSize="16px"
                        onClick={() => {
                          onClose();
                          setCartCount({ [data.id]: 7 });
                          update(data.id,7)
                         
                        }}
                      >
                        7
                      </Text>
                      <Text
                        _hover={{ bgColor: "teal.100" }}
                        
                        p="6px 16px"
                        fontSize="16px"
                        onClick={() => {
                          onClose();
                          setCartCount({ [data.id]: 8 });
                          
                          update(data.id,8)
                          
                        }}
                      >
                        8
                      </Text>
                      <Text
                        _hover={{ bgColor: "teal.100" }}
                        p="6px 16px"
                        fontSize="16px"
                        onClick={() => {
                          onClose();
                          setCartCount({ [data.id]: 9 });
                          update(data.id,9)
                         
                        }}
                      >
                        9
                      </Text>
                      <Text
                        _hover={{ bgColor: "teal.100" }}
                        p="6px 16px"
                        fontSize="16px"
                        onClick={() => {
                          onClose();
                          setCartCount({ [data.id]: 10 });
                          update(data.id,10)
                         
                        }}
                      >
                        10
                      </Text>
                     
                      <Flex
                        _hover={{ bgColor: "teal.100" }}
                        p="6px 16px"
                        alignItems="center"
                        gap={2}
                        onClick={() => {
                          onClose();
                          setCartCount({ [data.id]: 20 });
                          update(data.id,20)
                          
                        }}
                      >
                        <Text fontSize="16px">20</Text>
                        <Text fontSize="12px">Max Qty</Text>
                      </Flex>
                    </ModalBody>
                  </ModalContent>
                </Modal>
              </Flex>
              <Text color="gray" fontSize="10px">
                Inclusive of all taxes
              </Text>
              <Text color="#4F585E" fontSize="12px" fontWeight="600">
                Delivery by Tomorrow, before 10:00 pm
              </Text>
            </Box>
          </Flex>
        </Box>

        <Box className="right" w="30%" position="sticky" top="200px">
          <Box
            padding="15px"
            border="1px solid #4F585E"
            borderRadius="10px"
            mb="20px"
          >
            <Heading
              fontSize="20px"
              color="#4F585E"
              mb={2}
              textOverflow="ellipsis"
              overflow="hidden"
              whiteSpace="nowrap"
            >
              {data.desc}
            </Heading>
            <Flex justifyContent="space-between">
              <Flex alignItems="flex-end">
                <Text mr="10px" fontSize="18px" fontWeight="600">
                  {" "}
                  ₹{data.originalPrice}
                </Text>
                <Text fontSize="14px">MRP </Text>
                <Text mr="10px" fontSize="12px" as="del">
                  {" "}
                  ₹{data.newPrice}
                </Text>
                <Text
                  fontSize="12px"
                  bgColor="pink.300"
                  p="5px 15px"
                  color="white"
                  as="b"
                >
                  {data.offer}% OFF
                </Text>
              </Flex>
              <Box>{!cartItems.find(e=>e.id===data.id) ? <Button
                  ref={btnRef}
                  onClick={() => {
                    // onOpen();
                    // setmodalpos(false);
                    updateCart(amt,data.id)
                  }}
                  
                  bgColor="#10847E"
                  color="white"
                  as="b"
                >
                  {cartCount[data.id] ? (
                    <Text>
                      {`Qty ${cartCount[data.id]}`}
                      <ChevronDownIcon ml={2} />
                    </Text>
                  ) : (
                    "Add To Cart"
                  )}
                </Button> : <Button onClick={()=>removeItem(data.id)}>Remove</Button>}
                
              </Box>
            </Flex>
          </Box>
          
          <Button onClick={()=>{
            toast({
              title: 'User Not Logged in',
              status: 'error',
              duration: 3000,
              isClosable: true,
              position: "top",
            });
            navigate("/cart")}} variant="outline" colorScheme="teal" w="100%" size="lg"   as="b">
            View Cart &gt;
          </Button>
        </Box>
      </Flex>
      <hr />
      <Heading fontSize="25px" color="#4F585E" m="20px 0 -50px 15px">
        All Categories
      </Heading>
      <TabCarousal />
      <hr></hr>
      <Box m="20px 15px">
        <Heading fontSize="25px" color="#4F585E" mb={2}>
          About
        </Heading>
        <Text color="gray.600">{data.about}</Text>
      </Box>
      <hr />
      <Box m="20px 15px">
        <Text fontSize="19px" fontWeight="700" mb={3}>
          Product Details
        </Text>
        <Text color="#10847E" fontSize="19px" mb={2}>
          Brand: {data.company}
        </Text>
        <Text fontSize="19px" color="gray" mb={2}>
          Expires on or After 30/01/2023
        </Text>
        <Text fontSize="19px" color="gray" mb={2}>
          Country of Origin: India
        </Text>
        <Link>
          <Text color="#10847E" fontSize="19px" mb={2}>
            Manufacturer Details...
          </Text>
        </Link>
      </Box>
    </Box>
  );
};
export default Product;
