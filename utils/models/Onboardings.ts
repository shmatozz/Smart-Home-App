export interface Onboardings {
    title: string;
    description: string;
}

export const getOnboardings = () : Onboardings[] => {
    return (
        [
            {
                title: "Seamless Automation",
                description: "Control lights, thermostats, and more with a tap. Enjoy the convenience of automation tailored to your preferences."
            },
            {
                title: "Enhanced Security",
                description: "Keep your home secure with our advanced security features. Receive real-time alerts on your phone for any unexpected activity."
            },
            {
                title: "Energy Efficiency",
                description: "Take control of your energy consumption and contribute to a greener future.\n"
            },
        ]
    )
}