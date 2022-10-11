import {
  Box,
  Button,
 
  Flex,
  IconButton,
  Image,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AiOutlineRight, AiOutlineLeft } from 'react-icons/ai';
export const tabCards = [
    {
      title: "Medicine",
      path: "/medicines",
      img: "https://assets.pharmeasy.in/apothecary/images/medicine_ff.webp?dim=256x0",
    },
    {
      title: "Lab Tests",
      path: "/labTests",
      img: "https://assets.pharmeasy.in/apothecary/images/labtest_ff.webp?dim=256x0",
    },
    {
      title: "Healthcare",
      path: "/categories",
      img: "https://assets.pharmeasy.in/apothecary/images/healthcare_ff.webp?dim=256x0",
    },
    {
      title: "Health Blogs",
      path: "/",
      img: "https://assets.pharmeasy.in/apothecary/images/health_blogs_ff.webp?dim=256x0",
    },
    {
      title: "PLUS",
      path: "/",
      img: "https://assets.pharmeasy.in/apothecary/images/plus_ff.webp?dim=256x0",
    },
    {
      title: "Offers",
      path: "/offers",
      img: "https://assets.pharmeasy.in/apothecary/images/offers_ff.webp?dim=256x0",
    },
    {
      title: "Surgeries",
      path: "/",
      img: "https://assets.pharmeasy.in/apothecary/images/offers_1_ff.webp?dim=256x0",
    },
    {
      title: "Value Store",
      path: "/",
      img: "https://assets.pharmeasy.in/apothecary/images/value_store.png?dim=256x0",
    }
    
  ];
  
function TabCarousal() {
  
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [scroll,setScroll] = useState(0);

  function onScrollY(){
    
    document.getElementById("scrollBar").scrollLeft += 400;
    setScroll(prev=>prev+400)
  }
  function onScrollX(){
    document.getElementById("scrollBar").scrollLeft -= 400;
    setScroll(prev=>prev-400)
  }

  console.log(scroll);
  useEffect(() => {
    window.addEventListener("resize", () => setWindowWidth(window.innerWidth));
    return () => {
      window.removeEventListener("resize", () =>
        setWindowWidth(window.innerWidth)
      );
    };
  }, []);
  return (
    <Box
      width="100%"
      paddingLeft={{ base: "10px", sm: "20px", lg: "50px", xl: "50px" }}
      paddingRight={{ base: "10px", sm: "20px", lg: "50px", xl: "50px" }}
      mt="50px"
    >
      <Box width="100%"   position="relative">
        {windowWidth > 1024  && scroll > 0 && <IconButton onClick={onScrollX} bg={"rgba(0,0,0,0.5)"} position="absolute" top="50" left="-10" borderRadius="50%" icon={<AiOutlineLeft color="white" />}>
          L
        </IconButton>}

        <Flex
        
          width="100%"
          gap={{ base: "10px", lg: "50px", sm: "30px" }}
          overflowX="scroll"
          overflowY="hidden"
          paddingY={5}
          className="hideScroll"
          id="scrollBar"
          scrollBehavior="smooth"
          
        >
          {tabCards.map((tab) => (
            <Box
              maxWidth="141px"
              minW={{ base: "85px", sm: "110px", lg: "120px" }}
              
              key={tab.title}
              _hover={{lg:{boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px;",borderRadius: "10px"}}}
              cursor="pointer"
              // paddingX="12px"
              
            >
              <Image
                mb="10px"
                borderBottom={{base:"transparent",sm:"transparent",lg:"1px solid rgba(0,0,0,0.2)"}}
                src={tab.img}
                bg={{
                  base: "#BFEDDD",
                  sm: "#BFEDDD",
                  lg: "transparent",
                }}
                borderRadius={{base:"10px",sm:"10px",lg:"5px 5px 0 0",xl:"5px 5px 0 0"}}
              ></Image>

              <Text
                
                fontSize={{ base: "12px", sm: "15px", lg: "16px" }}
                fontWeight="500"
                mb={2}
              >
                {tab.title}
              </Text>
            </Box>
          ))}
        </Flex>
        {windowWidth > 1024 && scroll <450 && <IconButton  onClick={onScrollY} bg={"rgba(0,0,0,0.5)"}  position="absolute" top="50" right="-10" borderRadius="50%" icon={<AiOutlineRight color="white"/>}>
          
        </IconButton>}
      </Box>
    </Box>
  );
}

export default TabCarousal;
