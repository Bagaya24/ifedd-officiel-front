import { Card, Box, Stack, Typography } from "@mui/material";
import CustomCarousel from "./cunstomeCarousel";
import { Public,
     AccountBalanceOutlined, 
     FoodBankOutlined, 
     VolunteerActivismOutlined, 
     AttachMoneyOutlined, 
     Diversity3Outlined, 
     ForestOutlined, 
     WaterDropOutlined, 
     ComputerOutlined, 
     PeopleOutline } from "@mui/icons-material";

const sizeIcon = {xs:30, sm:40, md:50}
const cardData = [
    {
        icon: <AccountBalanceOutlined sx={{ fontSize: sizeIcon, color: "#ab003c" }}  />,
        title: "La bonne gourvenance des ressources naturelles",
        color: "#ab003c"
    },
    {
        icon: <FoodBankOutlined sx={{ fontSize: sizeIcon, color: "#f50057" }} />,
        title: "Sécurité alimentaire",
        color: "#f50057"
    },
    {
        icon: <VolunteerActivismOutlined sx={{ fontSize: sizeIcon, color: "#ff6333" }} />,
        title: "Santé",
        color: "#ff6333"
    },
    {
        icon: <AttachMoneyOutlined sx={{ fontSize: sizeIcon, color: "#ff9100" }} />,
        title: "Révelement socie-economique",
        color: "#ff9100"
    },
    {
        icon: <Diversity3Outlined sx={{ fontSize: sizeIcon, color:"#6fbf73" }} />,
        title: "Droits humains et protection",
        color: "#6fbf73"
    },
    {
        icon: <ForestOutlined sx={{ fontSize: sizeIcon, color:"#8bc34a" }} />,
        title: "Environnement",
        color: "#8bc34a"
    },
    {
        icon: <WaterDropOutlined sx={{ fontSize: sizeIcon, color:"#2196f3" }} />,
        title: "Eau, hygiène et assainissement",
        color: "#2196f3"
    },
    {
        icon: <ComputerOutlined sx={{ fontSize: sizeIcon, color: "#1769aa" }}/>,
        title: "Innovation et technologie",
        color: "#1769aa"
    },
    {
        icon: <Public sx={{ fontSize: sizeIcon, color: "#2979ff" }}/>,
        title: "Cohésion sociale et consolation de la paix",
        color: "#2979ff"
    },
    {
        icon: <PeopleOutline sx={{ fontSize: 50, color: "#2a3eb1" }}/>,
        title: "Plaidoyers",
        color: "#2a3eb1"
    },
];

export function AxesInterventions() {
    return (
        <CustomCarousel title={"Axes d'intervations"} slide={cardData.map((card, index) => (
                    <Box key={index} px={2} py={2}>
                        <Card
                            sx={{
                                py: 3,
                                textAlign: "center",
                                boxShadow: 3,
                                borderRadius: 3,
                                height: 100,
                                width: {xs:200, sm:250, md: 280, lg: 330},
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Stack spacing={2} alignItems="center">
                                <Box sx={{ borderRadius: "50%", p: 1 }}>
                                    {card.icon}
                                </Box>
                                <Typography variant="body2" fontWeight={500} gutterBottom color={card.color}>
                                    {card.title}
                                </Typography>
                            </Stack>
                        </Card>
                    </Box>
                ))}/>
        
        
    )
}