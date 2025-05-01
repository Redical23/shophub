"use client"
import { useRouter } from "next/navigation"

const CONSTITUTIONTEMP = ({ constitution }) => {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-[#00103a] py-10">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {constitution.map((constitutionItem, index) => (
            <div
              key={constitutionItem?._id || index}
              className="card perspective-1000 cursor-pointer"
              
              onClick={() => router.push(`/constitutionid/${constitutionItem?._id}`)}
            >
              <div className="card-inner relative w-full h-full transition-all duration-700 transform-style-preserve-3d group">
                {/* Front Side - Case Details */}
                <div style={{ backgroundImage: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQA8wMBEQACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAADBAECBQYAB//EAEMQAAEDAgMFBAcEBwcFAAAAAAEAAgMEEQUSIQYTMUFRImFxkRQVMkJSgbFTkqHBFiMkQ3KC0QczVGKTorI0RFVj0v/EABoBAAMBAQEBAAAAAAAAAAAAAAABAgMEBQb/xAAyEQACAgEDAwMDAgMJAAAAAAAAAQIRAxIhMQQTFDJBUSJCYVJxI4GhBRUkM0ORscHR/9oADAMBAAIRAxEAPwD5a1cTPoEGYoLQZoUs0SDNCk0QVoSGgrQgsK0KRlmjVIpBwEiiwCQFggaLIGSkxnkAW5IArZFgTbRAFShARZMRDggQJ+hTEE9xAz1HJJFVRSROLZGuGVwHAoutzOcVOLTOuqosDqK0Q4lhFSyuqGkmSCezAQD2gPley01QfK3PNh34Y7jJUvatziauDc1EsQIcGPLb9bHipR6C3SYBwTQyoFygVFsttUABmeqJbEJ3XurRzzYFUTRVqbIQZgUs1QdgUMtBmhItBWhIpB2BSyy4CQywCBjDBokUTZJjRayQyQEDJQBICALWSAjKEwPIAqQgD1kAVLU0AGQapksvlu0BIBvBqCSuxOlooHMbLNIGtc7gDx1TirdIzyzWPHKb4R3O09LDDLgkrRCZI5JKecxi2pYSNPPVbZYpVSPG6fI5Y8sW/wA/1PnWJgesKnKNN476rJHrw9CEy26Y6LNbYFA6BSmwTQmxOR3VUZMUf2pFa4MXyGypFULMCtmSDxhSzRBmhSWgzQkWGYEmUGAUFl2hA0EDUhhmJFE2KCiw4JASAgCwakMkCyAJQB6yAPWQBBGiAIAQIhwTAHk11RYmWsLIA2dhQHbY4UDw3rz5RuWuFfWrOTrn/hp/sdhtdTRMFBJCNJK45+85XBaZFwzyen4mvx/2fM8Qs6unfwzPJssT2sXoQq6wQabA3OsLoJbFpXE8FaM2xSUkqkZSZEEdz2k2xRQSyRRrR4ADwBXb2Tyl1QZmz5twcl2EWusCs2dJ4ZlPjmi6wK3Zt/Vyl9MUutDt2bk+J4+SXjFecvgINnJPjf5JeMUuvXwT+js/J7reCT6Z/JXnxJGzlR8R8lPjS+S110Ajdnqr4h5I8aXyPz4F/wBHqnr+CnxpD87GeGAVI5jyS8aQ112Mn1DVd3kl40il12M96jqgeA8kvGkPzsZ52CVQ5DyT8aQedi+TwwOq6I8eYedi+SpwSsCXjzH52L5KnB6z4UdiQebi+SPVFZ8AR48w8zF8nvU9Z8ICPHmLzcS9yPUtY7kPJPxpCfXY/kk7P1jrm48lXiyJ87GCdgVUDYkXR40h+bjN3YnBZ6XaWjqZdWx5uA5lpH5qo4HFps5Or6uM8Tivc6PaBorqKnYwtElNVhzwDq32uKHC1+xxYZqDf5VHDVWATTTOkDuy6x4dyUOnclZ6EOujGOmhc7Nyu4vPkrXTP5E+vQOXZx4GrnKvGJ85FP0bOW/aKpdMQ+uAN2azPtZya6ch9aMDZkR243TfTpi82g36LsPI+aPHRPnjUV12HmDkRQA5GgBhiQBmoAM0IAK1oQFhQ0dEBbPNA6BAWwgYDyCAtlhG34QgLZ4ta33QEUO2Uc+BrrFzUUKyjpYHHQtRQ9TDRBj+ACKDUy5iaeQ8kBqZUxM+EeSKDUyojYD7IRQa2WMTLeyEBqZTdtv7I8kJBqZnYjHiU1SY6R3o9PHHnzhmYyv5N8P6rnk5yk0vY1TSjbIhkqp2NdLSMikt2tSRfyRrzfpCo/JeWetghmyRsY4s7BjJzZuSicslfUhpRvZnN4dHjNLjNVM1xqjUsAlzu0Bvccuv1XLjlJ24msorazZpnYiIBvmQbwNAAsRdb48ubQqiRKEE95By+qmijp3MZCxvakcwXL3cvBapZJSt7Gb0JbOwtcyAlno5cWlgzBw1Dua2hNtbkNUKublZZaEgAQ03QATLvD0QSw2XwTCzn42pFDEbUANxiwQAwwJAHagArSgArCgAoQB5vFABhwQIHUVDadhLiFSVgZEtZPUyZIQbK6SEeGH1Ely99ieSVoD0mGVDRdsh79UakAGKqqaOTLIHEDmikwN6jrGVDRbioaodjB14JAUIQB66APWugC7Q1rtR2i291lGX8RmjX02LTO7a1IAynggFsWhDWAZQBrqVLiknSHbfIFjs8THHiVOFVBDn6mePd1WpFlTGHMMjQRc2N1z4pJyaNZKopgKmzWroMxE3dIAgDQjYGtF0EshMDAg14pFDUY1CAGmBAB2pAHYgC4GqACsCACoAlg1QBd7wxhceACYjBle+uqixpJatFstxGtBBHTsGgvbio3GefUAEai90UB4VDXG2ZOh2VljZUNIfbXglwIyy1+HVIy5si09Qmb9LMJog4LJqhhkgBnigCzTY3TAK7VxB91tlhwrNK9jPnNnLYggtzDVAFgOA5IfAClFrRsJ6n6lRi9CKnywsYzyAdNVUnSEguYujLbADiD1XPHaZrLeJm1ruS6jEXpWZpR3IBmhIUEgLpgYFO9Iofh11QA2xAgzQkMKwIAK1ABWoAIEAWaEAJ4tIY6Y2NrqogxfBYhut5a5KqRKGKubKCO1bwSQMxKusyaudw6rRRE2DpMQbKbMddNwEjZo5sxsS26yZaDYkxslK431CIvcAeBy3aWX4ImCNhQBW2qAJY272jqQk9hrmi8ptM8dCQs8avGXL1CEwu4K4O0TLZl1QiDxQAlhx3lGwj4n/APIrPF6EVPkai7DJJO7KE5cpAiC4tYw8m3+azkt2UuEZlWP1jltF2rIZbD26lyoTDS80CApiOdiUlD9OeCYD0Z0SAYYgAzUAFaEAEagAqAJYgDOx3+4BVx5E+CcKN6VvH5IlyCB199ePzTQmJYSxvrdkr6Ser3YLmwxRB+Y999FGfI1SSLxwTtnEbdY0yXFXOFNiFBKDqGzhtvkNFy65Xyb6VVf+CeBbRVUU7QcVnDL2y1LQ4eYSllmnsy4YoNbn09lZK6mg3rYZI5mdmemlD2Hu7lrjzNtJmc8C0txfHyVwIfrHEcF0zOZG8AoGQBZIA1K28pd8LSb9/BZ5X9DLhyDk1keRwLiqx+lCl6hSYZn5lMdpOI5cImy0JKc0AJ4aP2QDmHvH+4rPF6f5lT5NCoIbSxM94nMUo7zbBqlQvJcRA25or+Iw+xCuItytjf1CeP4HPmyaNuWK/ctSCrygQG4QFHPxBAxuLRADsLkgHIjdADAQARqACNQAQoAmM6IAXxSLe0xsL2VJgzOwacDNE42d0VSXuSaE8ecEce+6lMYPD4KSnlfUYhUiCmGhInEbiT87lY5ZxbX4N8aaTr3Pl+21Dg0uIP8AVeLxOBdcMnebea5lzsdEra3K7L7L1lbURsppKN73a2Lw5p+YU7ydFUoK2dTBhc+H4g+KenbTSRHtCB143HhwWmGDll/YWWcY4r+Tq8FhyRFxFiV3Te556NQKAKuQMNE7LC4/E4D5DVZZfguIM63PVXD0oh8gWND87PetcKZ7NSRUeKK8u5aEgzxQAphgzROt9q//AJLKG0W/3LkrYzUPzuPcLKoL6b+RSe4KR96bJfUOuEv9Qf2ETM3+FZxq6JwBS4yBzEpEMsIv0WxAGTQXQIW1QBjQhAxuNqBjDBZADbHWF+XVIQw0m17HqhNDDNKBBWIAIUASxAF8ocLHgUAYVfSSU0++iAstE7ExqjrmSsDZOy7mk4tAmNVeGYdUYVX1dXBG5waGte4c1yZUtTZ04m6SPgeNMZFicsdM4iMEgLONUaTtM1tm6OvMrZqKqfTyhwIexQ3uaRTaPomCjFsQqHuxJzJGNAAlZpnI7l0dNKTbfsY9SoxSXudbEwRxtaOXRdD3OQuDqkMh3DvQII/sRxA6ZgXLnyP1GsVsgYPZXQlsQ+QUbslQxx4A2PgVM+AT3L1TN3M5o1HLwRB3EbW4ueKokWwzWnlc0ab1/wAtVz39NfLf/JrW9hDwN10e1GZR2X0eTTtAix6cVD/zEUt4sthbw+Semd7MjNPEKcq4aFH4KSjIMq2RIvKezZAgCAMWFAx2IoAcpt1vAZgTGNSALqMjai2ioK5JCuIYzi1DBSOqKcbqW8ZayO27voHD5rx1lnJOTZ6fbgnSRq1z6uKGCoo43Smne1kjQPbYfa08Ssu5ke6ZWiHDQUlrXloN7L3MTbgmzy5pKTSCxuCsgKXAoAs1AFggCzmiRpD9QmBkVmE5iXwmxv0VqYqC48/0DY6ON7rOkJe4248lw5rdnbhS1L8HwOpcX1ch43dZSvSD3kdlssxzN04E2BJPlosW9jpgjp8Mx+SnhxQRTMBoXRHI8aPBAzAdLX/BXCTjHZk5IxnLdcHcZu1u8zXOFvZ531/NdkMsZLk4JYpRfGwMys3zoc1pWi5YdDbqqUkyXFpW0W3rInxvkA3ecZ78gs8zcY2hwjqdGDtdimNR14dghg9GYAI79q4Xkz6ypNN0d+PpZOKZyox/atkv6yWB2uoLABZaefa2YvDae6Oq2crqjEnwx1Dm717u21tg1oSh1uVyq9hZOmio3W5vVjx6Q9gcXNj7IPH8V6PTu02cmRVQtzW5kRhsVqKaNmr98558CVxwku47/JvNbGZXYxQULzHVVLWOHIrpWSLMtLM87VYRlP7U2x0HeVnKcXJMuKaTGcKxikln30T7hvNKeaFVYRgzYxFm7maLg52h2ivDPVGiJqtzPmOtlsSCugRgRVUH2iVhaGo6yAe+mO0OQVkRe3K/tXFlMt4tDTppmRtm/GaGG0rpRE6S8bGn2xo4H5H6LyHjcXpb2PUWSLWpI3MBixCrjw+czBrH55H9o3BtYA/Vcyi75NXONcGg+Vm9dnIDr6r34UoqjxpO22S2Vl9HhVYi3pDPiCLAIyob8QRYrDNnYfeCBhBLH8QQBEso3bjE4F4HZBNrlRNutio1qVnHf2g45j9NSNp6nDaWGlc3snIXi3iVyOU3ydsYQTuLPloqIZJS+SkidwPYLm/mqeyEqvg7vZqrwKWidHHVyU1YRZsM7btcO5yzcVp5NYSerjYzY8Gxl808VPA57a6bePk90MvwuhRckqXsDlGNps7QYljGEOc99BvIGt14OuAFloyQfBs8mLIqs5/Z3auXENsKufdbukMTmxsN+xw5k9QT81vOfbSkc8IvI3H2PpFLJBUxtMNVC59vZccpWkOo1R3Mp9PplsmEloXtF30xLTrfLcfgtLxvlf0Mksi4l/UUNJSuvmgiJ72hChhfshOeZctgmUtNE4mOGNh/ytsn2cXwie9P3YbMwWAIFuS0SS2RDbe7IJHIi6YqF8CxB0L6wzN3jHSPjA5i3Befkwycm4HUpxpJnO43g8eJVTpZadxvoNQuV9P1V7HVHJ09fUZceyEG8BcyzRqBmVdjqqB5OmNvA8Lp6KYF0Y3YOozcULpM93IUs+BKom3iFdHU1G8aGsa1uVrQeS9Hp8bgnZwZJJ7IRklYT7bfNb2ZAt9H9o3zTsD463EascJfwWVs5tTLtxWsH738EWxa2Gjxqtjc14kF2kEac0Nth3JLc63avEn1nolTNUmbfRtkMbTbdE8r8wvLknb3PfxtaU6Om2Qmcymu6pFzd7WjXh1XNwzeXCdHA1W0mIS1c0jnNDnPJIHDivZhtFHzE80nJ2VbtDX/ABKrZPdkEG0df8QRqDvMs3aSuHRGph3mEbtPXjmEamLvMINqcQ+II1MfeZubJY9PWYs1ta57omNzmONmYv7rKZ5Gjq6RvLJpvgFt9tXHiEr6aOTEImW/u5WNsPBp4LFz1M9RY6RwuGtpfTI3OfEQTqJY8v0TbCJ9PqsPwxuBw1UGFUrJC0kywybxjzbmOISyRjpVhCbWqmczHtVXRsDWZGtboAOS6FKlSPCeeTdsmbaqqnhdFMAWuFjYkFKT1KmVDqZQdozqSspKUSCKjbd/tOzm5WPag/Ubf3jmT+kuMRcw5oHSx9wfcLN9OvtZvD+1JffE3cJ20xGhytiqS7uvZQ1lgd2PqOmz7bX+TqqL+0CKU2xGjhdyJewA+YSWd/cjV9NH7G0bEWMbO1ovkkgJ5xvuPIrVZYP8GTxZl+QNXR0c+tJXDXgbWKvuSXpdkPFFr6otHPYpSYzStL6YsmZ42K0Wd/cjnn00r+h3+DlarHarDiGFpzPLnO1966MeR0c/UyljcU1uKu2qrDra3zV62c/fYF21NZ3eaNQu+VG1FZltYeaeth32UdtNVnkPNGth3gMm0NYdfzRqF3mC9fVnxDzRqDvMxRbogTLAIEXDRzSB8HZVb31uy2F1MrW3ZmiGnEN4Lzsy0zaR7vRz14k2drgBnocAxCTTeQUz3Nt3Nv0WOPeVG+eVQs+O5iTd1iTqV6y4PmC7XAIEXa4IAKCLJCGKSlnrZN1SQvmeBdzYxew6nogqEXP0o1YdlsXlGlKGfxyj8roN10uZ+xqYZszjWH1LammqoYJW+81xJH4JSVo3w9Plxy1Irjuy1TXN3tXiDd6Te5Y94us44mndno9y19S/2OJrcNnwuYte2KrYPdZmuflbRaOK+TPuSj7HQbLZa+QwU8FRh8uW5L3Exv8A5Vm4b1ZqsjcHS3HqvZKugbmikhnI1yMuHHwC0bo8l9Fmq1uYMkZa9zXsc17TYgixBTOR2nVFMjjwaT8kWFX7Ebp/2bvupWGn8Ebl5/dv+6UD0t+waOSpjsMkj2/C5pKznihI6sPVdRi9LdfncbindfRs8LumUkLneGS4Z6mP+0IT9cWjQixfEacDK18re4EqNLXKOxZIy4Y9S7Y2aWVF2db6Aqt/Yaa9wDG0mM0ro6tzYw6Qywu4EX5eC0WVw2OefSwz3Zy9Th9TBM+NsMzmtdYO3ZsV0qSe54U8M4yaS2FvRKq/9xN9wp6kR28nwy/oFbyo5/8ATKNS+R9nJ+lker646ehz/wCmUal8h2cn6WQ7DK63/Rz/AHCjUvkfZyfpZT1ZXf4Sf7iNS+Suxk/Sz6JFsNhOl45CP4yuXvyPY8PD8DDdicDB1gd4Ziks0w8TD8Bm7HYG3/s7/wAxR3cjF4uH4EtrcPgw/BaOCjiyRB7yGjvsscjbludGOEYKo8HTbNMbUUldDI3MySNzHN6gtCiDqY8iuNMRi2Lwl1nOoWMauvXI5vHw+8Q42XwFjT+wRO8Qlc/kfYwr7UQzZjCCexh8Q/lVapfIPDi/ShuHZfCWjtUEN/4VLkw7OP8ASj1JJSYc2pMVEzcRP0bfI0Hv01VQmuWXLHSSjt/I57GtsA4uEGFwG2l2VQH0ITeRCWJo42v2rq3SWbG6HqG1z3fRydWVdCTtpK17rl05v/75f/pS4jUh2kxyVxG9ikOvHePP1Kze3uaxlfsdbhOOZA0NsL6nOX/kmslclPHqN2rq31FMHx09OermAknzKc8m2yDFi33YXCqZtRCJZaZheSbnLdTGVojLBRkasdLGLAUzfupGewKppCJA6OlabcbtVJgCkBBGaCJt+Vk0h2QcpF8sY8GpUAKV1PGA6RzRfT2QhJvZA6SCvoJGwCYxysiOoc6OwW/baW5h3lexze0GH4ZiEbWV0jn5XX/VhoP4lTop7DeRtbo9RxYbTRxx722UktPYsNeHFR27ZSy0uDUZNHOcsDt6Tp2Tf6LVYfyT3a5RWto6qiax1VTyQtkdZhe21yh42kCyxk6KQyvYRexbzFtQsJRR0IcGVwJaVCGUaBezuP4JtiKOY257I+8i2BO+NtXBoUqI7RAqWm+UlxVKItSDUzamqlayIXueX9VSE2qMvbmY3ipI45TFE3R7JgQfFc2S3IrGlRq7FT/sjWuBF9O065Ux5Hk4NGtjnjncG+wdWkrqi1RiBZvDxzOP4J6h0MsdK0exp4JNhsSXydLfJTYUYuI0tVNR1bWwukzOuMrm/mUQf0s1b+pWfPMWwvFrERYfPl/yW/qhab3YpSdbI504DjJebYTV8fsyV0a41yYaZXwMR7PY3/4mtPfuiocov3KSY/SbNY49wvhFYT35R9SobXyaR/J1OGYBicNs1LUxG2oc9tvqsW7ZvGSSNl9BWehlu7GYcibLZ+m2RGf1bD2Gx4hBCBw8ClCqJyu5WacRrXi4+qoyKVj8RyXa8ADj3qo0Ji0rKolrnFp+d07GeAl5lgHiobKoRrXiKrpTLZzd4CQ1Xie5GVXHYzNtdo66eocyKR7IWaMYDYLobs5IpRPleLYjVSSHeON79UlFDlJszoqqdrr53E+KpxRCkzrNnsbqaMh8T3hwRQ9Vnb1e1eJ4/hsNPLEA2FwdmA10Q2qocY07NJzQ+Nr2mzi0HiuJt2eglsBZM6J3aFj1CKsBlmIAEBwb/Ek4iugm+hPunzU7lUUgpJZBmlIb3uVOZI1aCCwLs7u8CwS3YFqasl9IYW6NHIK9OxMqqjncU2Rirq19TJUzNLjcgW/os2kho3MCwdmHx5GVUh8QFOlMbexo1FNJUzB3pMrQBwBVxSRNkiCZmjKt/wA2hPYLKmOr/wAV/tSGDcKz7YH+VA6KxuqWMe10g7RQthvcRqm1J9gglLTuUmDo6WsfEXPf7yiSXwNSNGCknHF6z0j1jsEBiBPE96EiG7KxufNnz6HMVqo0TYtUXZICdQRzW1WqBNJ2SydoZYJpUTJtj1PVx24aIZNMrVVsTQ7sXBFrIVBTExJG+Nt2kacLp2hpMq5kLhmDe0O9Ie4AxQvkZnBsCk9mHKK4jgNBVXc8PuehVSySXDIUFLlHNVWw+ESPLnb75OWXfkadiAsdhsFbrae/8aPImPxoB6bZfC4fYbKf50LPNh48Eb9NgNBS0TpYw/MeRct7em2YpfVSBRBsZ11HQrB7nRpGfRYpmkgpJ0DEqrDh+7JstFNEuIp6NONLuTtE0zRqKiW5OYpKKKAU7jJJ2ySrqkSbMTQxoLQsm2OtgdXI5rwAeKjkqIzQdq106FI0LAA2QQgV0yixSAC9xAKpCBXvqVaQNlJAA0myHsCYekH6sBZvdhZoOYGgW6KWhNlATeyn3GhecBswy6ZuKpDBVLQ6F1xw4KkxiLWiysC8RSYg72NfYOCEAMtCEOyCLNJCPcD0GrbnqhjXA1LwCmYoGfJxWJuhSYdqyABRAZ/mriKXBqSm1Lbkt36TmXqMsAF7rqHwbERPcyWzTxUPgY8dQFCAAeKuwo//2Q==")' }} className="card-front absolute w-full h-full backface-hidden rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 text-white p-6 flex flex-col justify-between transition-all duration-700 group-hover:opacity-0">
                  <div className="space-y-4">
                    
                    <h2 className="text-2xl font-bold">Case Details</h2>
                    <div className="space-y-2">
                      <p className="text-sm truncate">
                        <span className="font-medium">Court No:</span> {constitutionItem?.courtNo || "N/A"}
                      </p>
                      <p className="text-sm truncate">
                        <span className="font-medium">Application No:</span> {constitutionItem?.applicationNo || "N/A"}
                      </p>
                      <p className="text-sm truncate">
                        <span className="font-medium">Delivered Date:</span> {constitutionItem?.Delivereddate || "N/A"}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-orange-200">Equivalent Citations</h3>
                      <p className="text-sm line-clamp-2">
                        {Array.isArray(constitutionItem?.["Equivalent citations"])
                          ? constitutionItem["Equivalent citations"].flat().join(", ")
                          : constitutionItem?.["Equivalent citations"] || "N/A"}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-indigo-200 italic mt-4">Hover to see more details</p>
                </div>

                {/* Back Side - Parties Involved */}
                <div style={{ backgroundImage: 'url("/c1.png")' }} className="card-back absolute w-full h-full backface-hidden rounded-2xl bg-gradient-to-br from-orange-500 to-orange-700 text-white p-6 transition-all duration-700 opacity-0 group-hover:opacity-100">
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold">Parties Involved</h2>
                    <div>
                      <h3 className="text-lg font-semibold text-orange-200">Applicant</h3>
                      <p className="text-sm truncate">{constitutionItem?.applicant || "N/A"}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-orange-200">Counsel for Applicant</h3>
                      <p className="text-sm truncate">{constitutionItem?.counselForApplicant || "N/A"}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-orange-200">Opposition Party</h3>
                      <p className="text-sm truncate">{constitutionItem?.oppositeParty || "N/A"}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-orange-200">Counsel for Opposite Party</h3>
                      {Array.isArray(constitutionItem?.counselForOppositeParty) ? (
                        <div className="space-y-1">
                          {constitutionItem.counselForOppositeParty.flat().map((party, index) => (
                            <p key={index} className="text-sm truncate">
                              {party}
                            </p>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm truncate">{constitutionItem?.counselForOppositeParty || "N/A"}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default CONSTITUTIONTEMP

