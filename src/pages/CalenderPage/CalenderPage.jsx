import { Paper, styled } from "@mui/material";
import dayjs from "dayjs";
import React from "react";
import { dayjsLocalizer, Calendar } from "react-big-calendar";

const CalenderWrapper = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  // textAlign: "center",
  color: theme.palette.text.secondary,
  height: "100%",
  width: "100%",
  lineHeight: "60px",
  borderRadius: "20px",
  padding: "15px",
  marginTop: "10px",
  // top: "75px",
}));

const CalenderPage = () => {
  const localizer = dayjsLocalizer(dayjs);

  //   const { user } = useAuthStore();
  //   const { openDateModal } = useUiStore();
  //   const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();
  //   const [lastView, setLastView] = useState(
  //     localStorage.getItem("lastView") || "week"
  //   );

  //   const eventStyleGetter = (event, start, end, isSelected) => {
  //     const isMyEvent =
  //       user.uid === event.user._id || user.uid === event.user.uid;

  //     const style = {
  //       backgroundColor: isMyEvent ? "#347CF7" : "#465660",
  //       borderRadius: "0px",
  //       opacity: 0.8,
  //       color: "white",
  //     };

  //     return {
  //       style,
  //     };
  //   };

  //   const onDoubleClick = (event) => {
  //     console.log({ doubleClick: event });
  //     openDateModal();
  //   };

  //   const onSelect = (event) => {
  //     console.log({ click: event });
  //     setActiveEvent(event);
  //   };

  //   const onViewChanged = (event) => {
  //     // console.log({ viewChanged: event });
  //     localStorage.setItem("lastView", event);
  //     setLastView(event);
  //   };

  //   useEffect(() => {
  //     startLoadingEvents();
  //   }, []);
  return (
    <div className="right-content w-100">
      <CalenderWrapper>
        <Calendar
          localizer={localizer}
        //   events={myEventsList}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
        />
      </CalenderWrapper>
    </div>
  );
};

export default CalenderPage;
