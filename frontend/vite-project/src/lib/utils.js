export const Time=()=>
{
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  return time;
}
