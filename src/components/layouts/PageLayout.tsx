import Container from "@/components/ui/Container";
import Heading from "@/components/typography/Heading";
import Text from "@/components/typography/Text";
import React from "react";

interface PageLayoutProps {
    title: string;
    description: string;
    children?: React.ReactNode;
}

export default function PageLayout({ title, description, children }: PageLayoutProps): React.ReactElement {
    return (
        <div className="min-h-screen py-16">
            <Container>
                <Heading level="h1" size="4xl" className="mb-8">
                    {title}
                </Heading>
                <Text variant="lead" fluid className="text-gray-700 mb-8">
                    {description}
                </Text>
                {children}
            </Container>
        </div>
    );
}
