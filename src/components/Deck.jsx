import React, { useState, useEffect, useRef } from "react";
import { useSprings, animated, to } from "react-spring";
import { useDrag } from "react-use-gesture";

// Final resting position of the images
const goTo = (i, total) => ({ x: 0, y: (total - 1 - i) * 4, scale: 1, rot: /*(total - 1 - i) * 2*/ Math.random() * 20 - 10, delay: i * 100 });

// Starting position from outside the screen
const goFrom = () => ({ x: window.innerWidth * 2, rot: 0, scale: 1.5, y: 0 });

// Interpolates rotation and scale into a css transform
const transformStyle = (r, s) => `perspective(1500px) rotateX(0deg) rotateY(0deg) rotateZ(${r * 0.3}deg) scale(${s})`;

export default function Deck({ images }) {
    // All the images in this set are gone
    const [gone] = useState(() => new Set());

    // Return timeout
    const returnCardsTimeout = useRef(null);

    // Springs for each card
    const [springProps, setSprings] = useSprings(images.length, (i) => ({ ...goTo(i, images.length), from: goFrom(i) }));

    // Gesture
    const gestureBind = useDrag(
        ({ args: [index], down, movement: [xDelta], direction: [xDir], velocity }) => {
            // Direction should either left or right
            const dir = xDir < 0 ? -1 : 1;

            // If the gesture is over and it had high velocity -> Flag the card to fly away
            if (!down && velocity > 0.3) gone.add(index);

            // Set the springs the current card
            setSprings((i) => {
                // Do not set if not the current card
                if (index !== i) return;

                // If the card is gone or not
                const isGone = gone.has(index);

                // When a card is gone it flys out left or right, otherwise goes back to zero
                const x = isGone ? (200 + window.innerWidth) * dir : down ? xDelta : 0;

                // Rotation while flying away -> Scales with velocity
                const rot = xDelta / 100 + (isGone ? dir * 10 * velocity : 0);

                // The rest of the images lift up
                const scale = down ? 1.1 : 1;

                // Set the spring
                return { x, rot, scale, delay: undefined, config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 } };
            });

            // After some time all the images come back
            if (!down && gone.size !== 0) {
                clearTimeout(returnCardsTimeout.current);
                returnCardsTimeout.current = setTimeout(() => gone.clear() || setSprings((i) => goTo(i, images.length)), gone.size === images.length ? 500 : 5000);
            }
        },
        { filterTaps: true, axis: "x" }
    );
    /*
    const gestureBind = useGesture(
        {
            onDrag: ({ args: [index], first, down, movement: [xDelta], direction: [xDir], vxvy: [vx, vy], velocity, cancel }) => {
                // Direction should either left or right
                const dir = xDir < 0 ? -1 : 1;

                // Cancel gesture if it is vertical
                if (first) {
                    console.log(Math.abs(vx), Math.abs(vy));
                    console.log(Math.abs(vx) < Math.abs(vy));
                    console.log("");
                }
                if (Math.abs(vx) < Math.abs(vy)) return cancel();

                // If the gesture is over and it had high velocity -> Flag the card to fly away
                if (!down && velocity > 0.3) gone.add(index);

                // Set the springs the current card
                setSprings((i) => {
                    // Do not set if not the current card
                    if (index !== i) return;

                    // If the card is gone or not
                    const isGone = gone.has(index);

                    // When a card is gone it flys out left or right, otherwise goes back to zero
                    const x = isGone ? (200 + window.innerWidth) * dir : down ? xDelta : 0;

                    // Rotation while flying away -> Scales with velocity
                    const rot = xDelta / 100 + (isGone ? dir * 10 * velocity : 0);

                    // The rest of the images lift up
                    const scale = down ? 1.1 : 1;

                    // Set the spring
                    return { x, rot, scale, delay: undefined, config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 } };
                });

                // After some time all the images come back
                if (!down && gone.size !== 0) {
                    clearTimeout(returnCardsTimeout.current);
                    returnCardsTimeout.current = setTimeout(() => gone.clear() || setSprings((i) => goTo(i, images.length)), gone.size === images.length ? 500 : 5000);
                }
            },
        },
        { filterTaps: true, axis: "x" }
    );
*/
    // Subscribe and unsubscrive to events
    useEffect(() => {
        // Update the interactive items to add the images
        window.PubSub.emit("updateInteractiveItems");
    }, []);

    return (
        <div className="deck">
            {springProps.map(({ x, y, rot, scale }, i) => (
                <animated.div className="card" key={i} style={{ x, y }}>
                    <animated.div className="cardContent hoverable" {...gestureBind(i)} style={{ transform: to([rot, scale], transformStyle) }}>
                        <img src={images[i]} alt="" className="cardImage" />
                    </animated.div>
                </animated.div>
            ))}
        </div>
    );
}
