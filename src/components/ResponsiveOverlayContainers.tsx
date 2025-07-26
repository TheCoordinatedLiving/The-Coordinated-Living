/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React from 'react';
import Image from 'next/image';
import { useResponsiveOverlays } from '@/hooks/useResponsiveOverlays';

interface ResponsiveOverlayContainerProps {
    children: React.ReactNode;
    className?: string;
}

export const ResponsiveOverlayContainer: React.FC<ResponsiveOverlayContainerProps> = ({
    children,
    className = ""
}) => {
    const positions = useResponsiveOverlays();

    return (
        <div className={`relative w-full h-full ${className}`}>
            {/* Background image container with proper aspect ratio */}
            <div className="relative w-full h-full overflow-hidden">
                <Image
                    src="/coordinated.webp"
                    alt="Experience Background"
                    fill
                    className="object-cover object-center"
                    style={{
                        minHeight: '100vh',
                        minWidth: '100vw'
                    }}
                />

                {/* Overlay container that maintains aspect ratio */}
                <div
                    className="absolute inset-0"
                    style={{
                        aspectRatio: '16/9',
                        maxWidth: '100%',
                        maxHeight: '100%',
                        margin: 'auto'
                    }}
                >
                    {React.Children.map(children, (child, index) => {
                        if (React.isValidElement(child)) {
                            const childProps = child.props as { 'data-overlay-type'?: string; style?: React.CSSProperties };
                            const overlayType = childProps['data-overlay-type'];
                            const position = positions[overlayType as keyof typeof positions];

                            if (position) {
                                return React.cloneElement(child as React.ReactElement<any>, {
                                    style: {
                                        ...childProps.style,
                                        position: 'absolute',
                                        left: position.left,
                                        top: position.top,
                                        bottom: position.bottom,
                                        right: position.right,
                                        width: position.width,
                                        height: position.height,
                                        transform: overlayType === 'laptop' ? 'translate(-50%, -50%)' : undefined
                                    }
                                });
                            }
                        }
                        return child;
                    })}
                </div>
            </div>
        </div>
    );
};
