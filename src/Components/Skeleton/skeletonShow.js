import Skeleton from "react-loading-skeleton";

const SkeletonShow = (props) => {
  const skeletonLength = Array.from({ length: props.length }).map(
    (_, index) => (
      <div key={index}>
        <Skeleton
          width={props.width}
          height={props.height}
          baseColor={props.color}
        />
      </div>
    )
  );
  return skeletonLength;
};
export default SkeletonShow;
