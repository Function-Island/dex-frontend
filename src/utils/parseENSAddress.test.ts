import { parseENSAddress } from './parseENSAddress'

describe('parseENSAddress', () => {
  it('test cases', () => {
    expect(parseENSAddress('hello.pls')).toEqual({ ensName: 'hello.pls', ensPath: undefined })
    expect(parseENSAddress('hello.pls/')).toEqual({ ensName: 'hello.pls', ensPath: '/' })
    expect(parseENSAddress('hello.world.pls/')).toEqual({ ensName: 'hello.world.pls', ensPath: '/' })
    expect(parseENSAddress('hello.world.pls/abcdef')).toEqual({ ensName: 'hello.world.pls', ensPath: '/abcdef' })
    expect(parseENSAddress('abso.lutely')).toEqual(undefined)
    expect(parseENSAddress('abso.lutely.pls')).toEqual({ ensName: 'abso.lutely.pls', ensPath: undefined })
    expect(parseENSAddress('pls')).toEqual(undefined)
    expect(parseENSAddress('pls/hello-world')).toEqual(undefined)
    expect(parseENSAddress('hello-world.pls')).toEqual({ ensName: 'hello-world.pls', ensPath: undefined })
    expect(parseENSAddress('-prefix-dash.pls')).toEqual(undefined)
    expect(parseENSAddress('suffix-dash-.pls')).toEqual(undefined)
    expect(parseENSAddress('it.pls')).toEqual({ ensName: 'it.pls', ensPath: undefined })
    expect(parseENSAddress('only-single--dash.pls')).toEqual(undefined)
  })
})
